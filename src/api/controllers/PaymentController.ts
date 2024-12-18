import { Request, Response } from 'express';
import { config } from 'dotenv';
import * as crypto from 'crypto';

// Load environment variables
config();

interface PaymentInitializeRequest {
  amount: string;
  currency: string;
  country: string;
  reference: string;
  successUrl: string;
  cancelUrl: string;
  notifyUrl: string;
  isTest: boolean;
}

export class PaymentController {
  private readonly ozowBaseUrl = 'https://pay.ozow.com';

  private generateHash(siteCode: string, amount: string, reference: string, privateKey: string): string {
    // Hash string format: SiteCode + Amount + TransactionReference + PrivateKey
    const hashString = `${siteCode}${amount}${reference}${privateKey}`;
    
    // Create SHA-512 hash and convert to lowercase
    return crypto.createHash('sha512')
      .update(hashString)
      .digest('hex')
      .toLowerCase();
  }

  private formatAmount(amount: string): string {
    // Convert to number, fix to 2 decimal places, and ensure it's a string
    return Number(amount).toFixed(2);
  }

  private validateEnvironmentVariables(): { siteCode: string; apiKey: string; privateKey: string } {
    const siteCode = process.env.VITE_OZOW_SITE_CODE;
    const apiKey = process.env.VITE_OZOW_API_KEY;
    const privateKey = process.env.VITE_OZOW_PRIVATE_KEY;

    if (!siteCode || !apiKey || !privateKey) {
      const missingVars = [
        !siteCode && 'siteCode',
        !apiKey && 'apiKey',
        !privateKey && 'privateKey'
      ].filter(Boolean);

      throw new Error(`Missing required environment variables: ${missingVars.join(', ')}`);
    }

    return { siteCode, apiKey, privateKey };
  }

  initializePayment = async (req: Request, res: Response) => {
    try {
      console.log('Initializing payment with request:', {
        body: req.body,
        headers: req.headers
      });

      const paymentData = req.body as PaymentInitializeRequest;
      const credentials = this.validateEnvironmentVariables();

      // Format amount to 2 decimal places
      const formattedAmount = this.formatAmount(paymentData.amount);

      const hashCheck = this.generateHash(
        credentials.siteCode,
        formattedAmount,
        paymentData.reference,
        credentials.privateKey
      );

      // Prepare form data for POST submission
      const formData = {
        SiteCode: credentials.siteCode,
        CountryCode: 'ZAF',
        CurrencyCode: 'ZAR',
        Amount: formattedAmount,
        TransactionReference: paymentData.reference,
        BankReference: paymentData.reference,
        NotifyUrl: paymentData.notifyUrl,
        SuccessUrl: paymentData.successUrl,
        CancelUrl: paymentData.cancelUrl,
        ErrorUrl: paymentData.cancelUrl,
        IsTest: 'false',
        HashCheck: hashCheck,
        ApiKey: credentials.apiKey,
        Optional1: '',
        Optional2: '',
        Optional3: '',
        Optional4: '',
        Optional5: '',
        Customer: JSON.stringify({
          Title: '',
          FirstName: 'Test',
          LastName: 'Customer',
          Email: 'test@example.com',
          Mobile: '',
          BusinessName: ''
        })
      };

      console.log('Generated Ozow payment data:', {
        url: `${this.ozowBaseUrl}/pay`,
        formData
      });

      res.json({
        redirectUrl: `${this.ozowBaseUrl}/pay`,
        formData
      });
    } catch (error) {
      console.error('Payment initialization failed:', error);
      res.status(500).json({ 
        error: 'Failed to initialize payment',
        message: error instanceof Error ? error.message : 'Unknown error'
      });
    }
  };

  checkStatus = async (req: Request, res: Response) => {
    try {
      const { transactionId } = req.params;
      // Implement status check logic here
      res.json({ status: 'pending', transactionId });
    } catch (error) {
      console.error('Failed to check transaction status:', error);
      res.status(500).json({ error: 'Failed to check transaction status' });
    }
  };
}
