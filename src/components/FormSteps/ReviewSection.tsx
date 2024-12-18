import { useCallback, useState } from 'react';
import { PaymentService } from '../../client/services/PaymentService';
import { Button } from '../ui/button';
import { Card } from '../ui/card';
import type { FormData } from '../../types/FormData';
import type { OptionalExtra } from '../../types/extras';

interface ReviewSectionProps {
  formData: FormData;
  availableExtras: OptionalExtra[];
}

export function ReviewSection({ formData, availableExtras }: ReviewSectionProps) {
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState<string | null>(null);

  // Calculate total amount
  const totalAmount = (() => {
    const baseAmount = formData.selectedPricing?.price || 0;
    const extrasAmount = formData.selectedExtras.reduce((sum, extra) => {
      const extraDetails = availableExtras.find(e => e.id === extra.id);
      return sum + (extraDetails?.pricePerMonth || 0);
    }, 0);
    return baseAmount + extrasAmount;
  })();

  const handlePayment = useCallback(async () => {
    try {
      setIsLoading(true);
      setError(null);

      const reference = `REF_${Date.now()}`;
      const paymentService = PaymentService.getInstance();

      // Initialize payment
      const response = await paymentService.initializePayment({
        amount: totalAmount,
        currency: 'ZAR',
        country: 'ZAF',
        reference,
        cancelUrl: `${window.location.origin}/payment/cancel`,
        successUrl: `${window.location.origin}/payment/success`,
        notifyUrl: `${window.location.origin}/api/payment/notify`
      });

						// Store transaction reference in session storage for later use
      sessionStorage.setItem('currentTransactionId', reference);

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
      setError(error instanceof Error ? error.message : 'Failed to initialize payment');
    } finally {
      setIsLoading(false);
    }
  }, [totalAmount]);

  return (
    <div className="space-y-6">
      <Card className="p-6">
        <h2 className="text-xl font-semibold mb-4">Review Your Selection</h2>
        
        {/* Property Details */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Selected Property</h3>
          <p>{formData.selectedProperty?.name || 'No property selected'}</p>
          <p>{formData.selectedRoom?.number ? `Room ${formData.selectedRoom.number}` : 'No room selected'}</p>
        </div>

        {/* Pricing Details */}
        <div className="mb-4">
          <h3 className="font-medium mb-2">Pricing</h3>
          <p>Base Price: R{formData.selectedPricing?.price || 0}</p>
          {formData.selectedExtras.length > 0 && (
            <div className="mt-2">
              <p className="font-medium">Selected Extras:</p>
              <ul className="list-disc pl-5">
                {formData.selectedExtras.map(extra => (
                  <li key={extra.id}>
                    {extra.name} - R{extra.pricePerMonth}/month
                  </li>
                ))}
              </ul>
            </div>
          )}
          <p className="mt-4 text-lg font-semibold">Total: R{totalAmount}</p>
        </div>
      </Card>

      {error && (
        <div className="text-red-500 text-sm mt-2">{error}</div>
      )}

      <Button
        onClick={handlePayment}
        disabled={isLoading}
        className="w-full"
      >
        {isLoading ? 'Processing...' : 'Proceed to Payment'}
      </Button>
    </div>
  );
}
