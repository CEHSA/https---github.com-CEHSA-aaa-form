const express = require('express');
const axios = require('axios');
const bodyParser = require('body-parser');
require('dotenv').config();

const app = express();
const port = process.env.PORT || 3000;

app.use(bodyParser.json());

// Endpoint to initialize payment
app.post('/api/payments/initialize', async (req, res) => {
  try {
    const { amount, currency, merchantRef, returnUrl, cancelUrl, customerName, customerEmail } = req.body;

    // Validate required parameters
    if (!amount || !currency || !merchantRef || !returnUrl || !cancelUrl || !customerName || !customerEmail) {
      return res.status(400).json({ error: 'Missing required parameters' });
    }

    // Ozow API endpoint for payment initialization
    const ozowUrl = 'https://api.ozow.com/v1/payments';

    // Ozow API credentials
    const ozowApiKey = process.env.OZOW_API_KEY;
    const ozowApiSecret = process.env.OZOW_API_SECRET;

    // Data to be sent to Ozow's API
    const data = {
      amount,
      currency,
      merchantRef,
      returnUrl,
      cancelUrl,
      customer: {
        name: customerName,
        email: customerEmail,
      },
    };

    // Make POST request to Ozow's API
    const response = await axios.post(ozowUrl, data, {
      auth: {
        username: ozowApiKey,
        password: ozowApiSecret,
      },
    });

    // Send Ozow's response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Payment initialization failed:', error);
    res.status(500).json({ error: 'Payment initialization failed' });
  }
});

// Endpoint to check payment status
app.get('/api/payments/status', async (req, res) => {
  try {
    const { transactionId } = req.query;

    if (!transactionId) {
      return res.status(400).json({ error: 'Missing transactionId parameter' });
    }

    // Ozow API endpoint for checking payment status
    const ozowUrl = `https://api.ozow.com/v1/payments/${transactionId}`;

    // Ozow API credentials
    const ozowApiKey = process.env.OZOW_API_KEY;
    const ozowApiSecret = process.env.OZOW_API_SECRET;

    // Make GET request to Ozow's API
    const response = await axios.get(ozowUrl, {
      auth: {
        username: ozowApiKey,
        password: ozowApiSecret,
      },
    });

    // Send Ozow's response back to the frontend
    res.json(response.data);
  } catch (error) {
    console.error('Failed to check payment status:', error);
    res.status(500).json({ error: 'Failed to check payment status' });
  }
});

app.listen(port, () => {
  console.log(`Server is running on port ${port}`);
});