import { FormData } from '../../types/FormData';

interface TermsAndConditionsProps {
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
}

export function TermsAndConditions({ formData, onFormDataChange }: TermsAndConditionsProps) {
  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">Terms and Conditions</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <input
              type="checkbox"
              checked={formData.acceptedTerms}
              onChange={(e) => onFormDataChange({ acceptedTerms: e.target.checked })}
              className="h-4 w-4 text-aaa-orange focus:ring-aaa-orange border-gray-300 rounded"
            />
            <label className="text-sm font-medium">
              I have read and agree to the terms and conditions
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}
