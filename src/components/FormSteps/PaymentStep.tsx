import { PaymentService } from '../../client/services/PaymentService';
import { Card } from '../ui/card';
import { Button } from '../ui/button';
import { Label } from '../ui/label';
import { Input } from '../ui/input';
import { FormData } from '../../types/FormData';

interface PaymentStepProps {
		formData: FormData;
}

export function PaymentStep({ formData }: PaymentStepProps) {
		const paymentService = PaymentService.getInstance();

		const handlePayment = async () => {
				try {
						const response = await paymentService.initializePayment({
								amount: formData.selectedPricing?.price || 0,
        currency: 'ZAR',
        country: 'ZAF',
        reference: `PAYMENT-${Date.now()}`,
        cancelUrl: `${window.location.origin}/payment/cancel`,
								successUrl: `${window.location.origin}/payment/success`,
								notifyUrl: `${window.location.origin}/api/payment/notify`
      });

						// Create and submit form
      const form = document.createElement('form');
      form.method = 'POST';
      form.action = response.redirectUrl;

						// Add form data as hidden fields
						for (const [key, value] of Object.entries(response.formData)) {
								const input = document.createElement('input');
        input.type = 'hidden';
        input.name = key;
								input.value = String(value);
        form.appendChild(input);
      }

						document.body.appendChild(form);
      form.submit();
    } catch (error) {
      console.error('Payment initialization failed:', error);
    }
  };

		return (
				<Card className="p-6">
      <h2 className="text-lg font-semibold mb-4">Payment Details</h2>
      <div className="space-y-4">
								<div>
          <Label htmlFor="amount">Amount (ZAR)</Label>
          <Input
            id="amount"
            type="number"
            value={formData.selectedPricing?.price || 0}
            disabled
            className="bg-gray-100"
          />
        </div>

								<Button
          onClick={handlePayment}
          disabled={!formData.selectedPricing?.price}
          className="w-full"
        >
          Proceed to Payment
        </Button>
      </div>
    </Card>
  );
}
