import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { checkPaymentStatus } from '../services/PaymentService';

const PaymentSuccess = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const handlePaymentSuccess = async () => {
      const transactionId = queryParams.get('transactionId');
      if (transactionId) {
        try {
          const statusResponse = await checkPaymentStatus(transactionId);
          console.log('Payment status:', statusResponse);
          // Update payment status in the system
        } catch (error) {
          console.error('Failed to check payment status:', error);
        }
      }
    };

    handlePaymentSuccess();
  }, [queryParams]);

  return (
    <div>
      <h1>Payment Successful</h1>
      <p>Thank you for your payment.</p>
    </div>
  );
};

export default PaymentSuccess;
