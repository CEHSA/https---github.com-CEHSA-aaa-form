import { FormData } from '../../types/FormData';
import { Checkbox } from '../ui/checkbox';

interface DirectMarketingProps {
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
}

export function DirectMarketing({ formData, onFormDataChange }: DirectMarketingProps) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto px-4">
      <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">Direct Marketing Preferences</h2>
        
        <div className="space-y-4">
          <div className="flex items-center space-x-2">
            <Checkbox
              id="directMarketing"
              checked={formData.directMarketing}
              onCheckedChange={(checked) => {
                onFormDataChange({
                  directMarketing: checked as boolean
                });
              }}
            />
            <label
              htmlFor="directMarketing"
              className="text-sm font-medium leading-none peer-disabled:cursor-not-allowed peer-disabled:opacity-70"
            >
              I would like to receive direct marketing communications
            </label>
          </div>
        </div>
      </div>
    </div>
  );
}