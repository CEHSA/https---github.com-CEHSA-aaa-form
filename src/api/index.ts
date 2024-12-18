import express, { NextFunction } from 'express';
import cors from 'cors';
import { config } from 'dotenv';
import { WebSocket, WebSocketServer } from 'ws';
import { createServer } from 'http';
import { fileURLToPath } from 'url';
import { dirname, join } from 'path';
import paymentRoutes from './routes/payment.js';
import { securityHeaders } from './middleware.js';

// Load environment variables
config();

// Get directory path for serving static files
const __filename = fileURLToPath(import.meta.url);
const __dirname = dirname(__filename);

console.log('Starting server initialization...');

const app = express();
const server = createServer(app);
const wss = new WebSocketServer({ server });
const port = process.env.PORT || 3000;

// Store WebSocket clients
const clients = new Set<WebSocket>();

// WebSocket connection handler
wss.on('connection', (ws: WebSocket) => {
  clients.add(ws);
  console.log('New WebSocket client connected');

  ws.on('close', () => {
    clients.delete(ws);
    console.log('Client disconnected');
  });
});

// Broadcast to all connected clients
function broadcast(data: unknown) {
  clients.forEach(client => {
    if (client.readyState === WebSocket.OPEN) {
      try {
        client.send(JSON.stringify(data));
      } catch (e) {
        console.error('Error broadcasting to client:', e);
      }
    }
  });
}

// Debug middleware to log all requests
app.use((req, _res, next) => {
  const logData = {
    timestamp: new Date().toISOString(),
    method: req.method,
    path: req.url
  };
  console.log(`[${logData.timestamp}] ${req.method} ${req.url}`);
  broadcast(logData);
  next();
});

// CORS configuration
const allowedOrigins = [
  process.env.FRONTEND_URL || 'https://aaarent.co.za',
  'http://localhost:5173',  // Vite dev server
  'http://localhost:4173',  // Vite preview
  'http://localhost:5174'   // Alternative dev port
];

// Middleware
app.use(cors({
  origin: function(origin, callback) {
    if (!origin || allowedOrigins.includes(origin)) {
      callback(null, true);
    } else {
      callback(new Error('Not allowed by CORS'));
    }
  },
  credentials: true,
  methods: ['GET', 'POST', 'OPTIONS', 'PUT', 'DELETE'],
  allowedHeaders: ['Content-Type', 'Authorization', 'X-Requested-With']
}));

app.use(express.json());
app.use(securityHeaders);

console.log('Middleware configured');

// Serve static files from public directory
app.use(express.static(join(__dirname, 'public')));

// Health check route
app.get('/health', (_req, res) => {
  res.json({ status: 'ok' });
});

// Status page route
app.get('/status', (_req, res) => {
  res.sendFile(join(__dirname, 'public', 'status.html'));
});

// Mount payment routes
console.log('Configuring routes...');
app.use('/api/payments', paymentRoutes);
console.log('Routes configured at /api/payments');

// List all registered routes
console.log('\nRegistered routes:');
interface RouterLayer {
  route?: {
    path: string;
    methods: Record<string, boolean>;
  };
  name?: string;
  handle: {
    stack: RouterLayer[];
  };
}

const router = app._router.stack as RouterLayer[];
router.forEach((middleware) => {
  if (middleware.route) {
    console.log(`${Object.keys(middleware.route.methods)} ${middleware.route.path}`);
  } else if (middleware.name === 'router') {
    middleware.handle.stack.forEach((stackHandler: RouterLayer) => {
      if (stackHandler.route) {
        const path = stackHandler.route.path === '/' ? '' : stackHandler.route.path;
        console.log(`${Object.keys(stackHandler.route.methods)} /api/payments${path}`);
      }
    });
  }
});

// Error handling
app.use((err: Error, _req: express.Request, res: express.Response, _next: NextFunction) => {
  console.error('Error:', err);
  res.status(500).json({ error: 'Internal server error', message: err.message });
});

// Start server
server.listen(port, () => {
  console.log('\n=== Server Configuration ===');
  console.log(`Server running on port ${port}`);
  console.log(`Status page available at http://localhost:${port}/status`);
  console.log('Environment variables:');
  console.log({
    nodeEnv: process.env.NODE_ENV,
    frontendUrl: process.env.FRONTEND_URL || 'https://aaarent.co.za',
    ozowSiteCode: process.env.VITE_OZOW_SITE_CODE ? 'Set' : 'Not set',
    ozowApiKey: process.env.VITE_OZOW_API_KEY ? 'Set' : 'Not set',
    ozowPrivateKey: process.env.VITE_OZOW_PRIVATE_KEY ? 'Set' : 'Not set',
    ozowTestMode: process.env.VITE_OZOW_TEST_MODE
  });
  console.log('=========================\n');
});
