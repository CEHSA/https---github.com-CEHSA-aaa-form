import axios from 'axios';
import { API_BASE_URL } from '../utils/constants';
import { windowLocation } from '../utils/windowLocation';

export const initializePayment = async (paymentData: any): Promise<any> => {
  try {
    const returnUrl = `${windowLocation.origin}/payment-success`;
    const cancelUrl = `${windowLocation.origin}/payment-cancel`;

    const requestData = {
      ...paymentData,
      returnUrl,
      cancelUrl,
    };

    const response = await axios.post(`${API_BASE_URL}/api/payments/initialize`, requestData);
    return response.data;
  } catch (error) {
    throw new Error('Payment initialization failed');
  }
};

export const checkPaymentStatus = async (transactionId: string): Promise<any> => {
  try {
    const response = await axios.get(`${API_BASE_URL}/api/payments/status`, {
      params: { transactionId },
    });
    return response.data;
  } catch (error) {
    throw new Error('Failed to check payment status');
  }
};