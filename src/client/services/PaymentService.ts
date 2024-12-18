import axios from 'axios';

import { SupportedCurrency, SupportedCountry } from '../../types/payment';

interface PaymentInitializeParams {
  amount: number;
  currency: SupportedCurrency;
  country: SupportedCountry;
  reference: string;
  cancelUrl: string;
  successUrl: string;
		notifyUrl: string;
}

interface PaymentResponse {
		redirectUrl: string;
		formData: Record<string, string>;
}

export class PaymentService {
  private static instance: PaymentService;
  private readonly baseUrl: string;
  
  private constructor() {
    this.baseUrl = import.meta.env.VITE_API_URL || 'http://localhost:3000';
  }

  public static getInstance(): PaymentService {
    if (!PaymentService.instance) {
      PaymentService.instance = new PaymentService();
    }
    return PaymentService.instance;
  }

  public async initializePayment(params: PaymentInitializeParams): Promise<PaymentResponse> {
    try {
      console.log('Initializing payment with params:', params);

      const response = await axios.post(`${this.baseUrl}/api/payments/initialize`, {
        amount: params.amount.toFixed(2),
        currency: params.currency,
        country: params.country,
        reference: params.reference,
        successUrl: params.successUrl,
        cancelUrl: params.cancelUrl,
        notifyUrl: params.notifyUrl,
        isTest: false
      }, {
        headers: {
          'Content-Type': 'application/json'
        }
      });

      console.log('Payment initialized successfully:', response.data);

      if (!response.data || !response.data.redirectUrl || !response.data.formData) {
        throw new Error('Invalid response from payment gateway');
      }

      return {
        redirectUrl: response.data.redirectUrl,
        formData: response.data.formData
      };
    } catch (error) {
      console.error('Payment initialization failed:', error);
      
      if (axios.isAxiosError(error)) {
        const errorMessage = error.response?.data?.message || error.response?.data?.error || error.message;
        throw new Error(`Payment gateway error: ${errorMessage}`);
      }
      
      throw error instanceof Error ? error : new Error('Failed to initialize payment');
    }
  }
}