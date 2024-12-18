import React, { useEffect, useState } from 'react';
import { 
  CheckCircle, 
  XCircle, 
  AlertTriangle, 
  Clock 
} from 'lucide-react';
import type { PaymentDisplayStatus } from '../types/payment';
import { usePaymentStore } from '../stores/paymentStore';
import { checkPaymentStatus } from '../services/PaymentService';
import { logger } from '../utils/logger';

interface PaymentResultProps {
  transactionId?: string;
  status?: 'success' | 'cancel' | 'notify';
  title?: string;
  message?: string;
  redirectTimeout?: number;
  onRedirect?: () => void;
}

export const PaymentResult: React.FC<PaymentResultProps> = ({ 
  transactionId,
  status: initialStatus,
  title: customTitle,
  message: customMessage,
  redirectTimeout = 5000,
  onRedirect 
}) => {
  const [status, setStatus] = useState<PaymentDisplayStatus>(
    initialStatus === 'success' ? 'Complete' :
    initialStatus === 'cancel' ? 'Cancelled' :
    'Pending'
  );
  const [error, setError] = useState<string>();
  const { getTransaction, updateTransaction } = usePaymentStore();

  useEffect(() => {
    if (!transactionId) return;

    let isMounted = true;
    
    const checkStatus = async () => {
      try {
        const transaction = await checkPaymentStatus(transactionId);
        if (isMounted) {
          setStatus(transaction.status === 'complete' ? 'Complete' :
                     transaction.status === 'cancelled' ? 'Cancelled' :
                     transaction.status === 'error' ? 'Error' :
                     'Pending');
        }
      } catch (err) {
        logger.error('Failed to check payment status:', { error: err });
        if (isMounted) {
          setError(err instanceof Error ? err.message : 'Failed to check payment status');
          setStatus('Error');
        }
      }
    };

    // Check status immediately and then every 5 seconds
    checkStatus();
    const interval = setInterval(checkStatus, 5000);

    // Handle redirect after success
    if (status === 'Complete' && onRedirect) {
      const timeout = setTimeout(() => {
        if (isMounted) {
          onRedirect();
        }
      }, redirectTimeout);
      return () => {
        clearTimeout(timeout);
        clearInterval(interval);
        isMounted = false;
      };
    }

    return () => {
      clearInterval(interval);
      isMounted = false;
    };
  }, [transactionId, status, onRedirect, redirectTimeout, getTransaction, updateTransaction]);

  const getStatusIcon = () => {
    switch (status) {
      case 'Complete':
        return <CheckCircle className="w-12 h-12 text-green-500" />;
      case 'Cancelled':
        return <XCircle className="w-12 h-12 text-red-500" />;
      case 'Error':
        return <AlertTriangle className="w-12 h-12 text-red-500" />;
      default:
        return <Clock className="w-12 h-12 text-blue-500 animate-spin" />;
    }
  };

  const getTitle = () => {
    if (customTitle) return customTitle;
    switch (status) {
      case 'Complete':
        return 'Payment Successful';
      case 'Cancelled':
        return 'Payment Cancelled';
      case 'Error':
        return 'Payment Failed';
      default:
        return 'Processing Payment';
    }
  };

  const getMessage = () => {
    if (customMessage) return customMessage;
    switch (status) {
      case 'Complete':
        return 'Your payment has been processed successfully. You will be redirected shortly.';
      case 'Cancelled':
        return 'The payment was cancelled. Please try again if you wish to complete the payment.';
      case 'Error':
        return error || 'An error occurred while processing your payment. Please try again.';
      default:
        return 'Please wait while we process your payment...';
    }
  };

  return (
    <div className="flex flex-col items-center justify-center min-h-[400px] p-8">
      <div className="mb-6">
        {getStatusIcon()}
      </div>
      <h2 className="text-2xl font-bold mb-4 text-center">
        {getTitle()}
      </h2>
      <p className="text-center text-gray-600 max-w-md">
        {getMessage()}
      </p>
      {status === 'Complete' && onRedirect && (
        <p className="text-sm text-gray-500 mt-4">
          Redirecting in {Math.ceil(redirectTimeout / 1000)} seconds...
        </p>
      )}
    </div>
  );
};
