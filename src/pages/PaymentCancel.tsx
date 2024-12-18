import React, { useEffect } from 'react';
import { useLocation } from 'react-router-dom';
import { checkPaymentStatus } from '../services/PaymentService';

const PaymentCancel = () => {
  const location = useLocation();
  const queryParams = new URLSearchParams(location.search);

  useEffect(() => {
    const handlePaymentCancel = async () => {
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

    handlePaymentCancel();
  }, [queryParams]);

  return (
    <div>
      <h1>Payment Cancelled</h1>
      <p>Your payment has been cancelled.</p>
    </div>
  );
};

export default PaymentCancel;
