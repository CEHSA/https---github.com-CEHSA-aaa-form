import { PaymentResult } from '../components/PaymentResult';

export function PaymentNotify() {
  return (
    <PaymentResult
      status="notify"
      title="Payment Processing"
      message="Your payment is being processed. Please wait while we confirm your transaction. You will receive a confirmation email once the payment is complete."
    />
  );
}
