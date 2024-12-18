import { Router } from 'express';
import { PaymentController } from '../controllers/PaymentController.js';

const router = Router();
const paymentController = new PaymentController();

// Log when routes are being registered
console.log('Registering payment routes...');

// Debug middleware specific to payment routes
router.use((req, _res, next) => {
  console.log(`[Payment Route] ${req.method} ${req.originalUrl}`);
  console.log('Request body:', req.body);
  next();
});

// Initialize payment route
router.post('/initialize', async (req, res) => {
  console.log('Payment initialize route hit');
  try {
    await paymentController.initializePayment(req, res);
  } catch (error) {
    console.error('Error in initialize route:', error);
    res.status(500).json({ 
      error: 'Payment initialization failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

// Status check route
router.post('/status', async (req, res) => {
  console.log('Payment status route hit');
  try {
    await paymentController.checkStatus(req, res);
  } catch (error) {
    console.error('Error in status route:', error);
    res.status(500).json({ 
      error: 'Status check failed',
      message: error instanceof Error ? error.message : 'Unknown error'
    });
  }
});

console.log('Payment routes registered');

export default router;
