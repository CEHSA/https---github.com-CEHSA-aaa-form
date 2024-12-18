import React from 'react';

interface PaymentDetailsProps {
  formData: {
    rentalType: string;
    roomType: string;
  };
  onChange: (e: React.ChangeEvent<HTMLSelectElement>) => void;
}

export function PaymentDetails({ formData, onChange }: PaymentDetailsProps) {
  return (
    <div className="min-h-[500px] sm:min-h-[600px] md:min-h-[800px] flex flex-col">
      <div className="space-y-6 text-aaa-white">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-aaa-orange mb-2">Payment Details</h2>
          </div>

          <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
            <div>
              <label className="block text-sm font-semibold text-aaa-orange mb-1">
                Payment Type
              </label>
              <p className="text-xs text-aaa-white/80 mb-1">Select your preferred payment schedule</p>
              <select
                name="rentalType"
                value={formData.rentalType}
                onChange={onChange}
                className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm"
              >
                <option value="monthly">Monthly (R4,500)</option>
                <option value="annually">Annually (R45,000)</option>
              </select>
            </div>

            <div>
              <label className="block text-sm font-semibold text-aaa-orange mb-1">
                Room Type
              </label>
              <p className="text-xs text-aaa-white/80 mb-1">Select your preferred room arrangement</p>
              <select
                name="roomType"
                value={formData.roomType}
                onChange={onChange}
                className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm"
              >
                <option value="single">Single</option>
                <option value="sharing">Sharing</option>
              </select>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}