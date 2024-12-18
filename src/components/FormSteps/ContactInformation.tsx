import { FormData } from '../../types/FormData';

interface ContactInformationProps {
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
}

export function ContactInformation({ formData, onFormDataChange }: ContactInformationProps) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto px-4">
      <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">Contact Information</h2>
        
        <div className="space-y-4">
          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="email" className="text-white/70">
              Email Address
            </label>
            <input
              type="email"
              id="email"
              value={formData.email || ''}
              onChange={(e) => onFormDataChange({ email: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="phone" className="text-white/70">
              Phone Number
            </label>
            <input
              type="tel"
              id="phone"
              value={formData.phone || ''}
              onChange={(e) => onFormDataChange({ phone: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Alternative Contact */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="alternativeContact" className="text-white/70">
              Alternative Contact Number (Optional)
            </label>
            <input
              type="tel"
              id="alternativeContact"
              value={formData.alternativeContact || ''}
              onChange={(e) => onFormDataChange({ alternativeContact: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
            />
          </div>

          {/* Contact Preference */}
          <div className="flex flex-col space-y-1">
            <label className="text-white/70">Preferred Contact Method</label>
            <div className="flex flex-wrap gap-4">
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="contactPreference"
                  value="email"
                  checked={formData.contactPreference === 'email'}
                  onChange={(e) => onFormDataChange({ contactPreference: e.target.value as 'email' | 'phone' })}
                  className="text-aaa-orange focus:ring-aaa-orange"
                />
                <span className="text-white">Email</span>
              </label>
              <label className="flex items-center space-x-2">
                <input
                  type="radio"
                  name="contactPreference"
                  value="phone"
                  checked={formData.contactPreference === 'phone'}
                  onChange={(e) => onFormDataChange({ contactPreference: e.target.value as 'email' | 'phone' })}
                  className="text-aaa-orange focus:ring-aaa-orange"
                />
                <span className="text-white">Phone</span>
              </label>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}