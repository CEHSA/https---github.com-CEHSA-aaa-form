import { FormData } from '../../types/FormData';

interface GuardianDetailsProps {
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
}

export function GuardianDetails({ formData, onFormDataChange }: GuardianDetailsProps) {
  return (
    <div className="space-y-4 max-w-2xl mx-auto px-4">
      <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">Guardian Details</h2>
        
        <div className="space-y-4">
          {/* Name */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="guardianName" className="text-white/70">
              Full Name
            </label>
            <input
              type="text"
              id="guardianName"
              value={formData.guardianName || ''}
              onChange={(e) => onFormDataChange({ guardianName: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* ID Number */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="guardianId" className="text-white/70">
              ID Number
            </label>
            <input
              type="text"
              id="guardianId"
              value={formData.guardianId || ''}
              onChange={(e) => onFormDataChange({ guardianId: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Relationship */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="relationship" className="text-white/70">
              Relationship to Student
            </label>
            <input
              type="text"
              id="relationship"
              value={formData.relationship || ''}
              onChange={(e) => onFormDataChange({ relationship: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Email */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="guardianEmail" className="text-white/70">
              Email Address
            </label>
            <input
              type="email"
              id="guardianEmail"
              value={formData.guardianEmail || ''}
              onChange={(e) => onFormDataChange({ guardianEmail: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Phone */}
          <div className="flex flex-col space-y-1">
            <label htmlFor="guardianPhone" className="text-white/70">
              Phone Number
            </label>
            <input
              type="tel"
              id="guardianPhone"
              value={formData.guardianPhone || ''}
              onChange={(e) => onFormDataChange({ guardianPhone: e.target.value })}
              className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
              required
            />
          </div>

          {/* Address */}
          <div className="space-y-4">
            <h3 className="text-lg font-semibold text-white">Physical Address</h3>
            
            {/* Street */}
            <div className="flex flex-col space-y-1">
              <label htmlFor="guardianStreet" className="text-white/70">
                Street Address
              </label>
              <input
                type="text"
                id="guardianStreet"
                value={formData.guardianAddress?.street || ''}
                onChange={(e) => onFormDataChange({
                  guardianAddress: { ...formData.guardianAddress, street: e.target.value }
                })}
                className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
                required
              />
            </div>

            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              {/* City */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="guardianCity" className="text-white/70">
                  City
                </label>
                <input
                  type="text"
                  id="guardianCity"
                  value={formData.guardianAddress?.city || ''}
                  onChange={(e) => onFormDataChange({
                    guardianAddress: { ...formData.guardianAddress, city: e.target.value }
                  })}
                  className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
                  required
                />
              </div>

              {/* State/Province */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="guardianState" className="text-white/70">
                  Province
                </label>
                <input
                  type="text"
                  id="guardianState"
                  value={formData.guardianAddress?.state || ''}
                  onChange={(e) => onFormDataChange({
                    guardianAddress: { ...formData.guardianAddress, state: e.target.value }
                  })}
                  className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
                  required
                />
              </div>

              {/* Postal Code */}
              <div className="flex flex-col space-y-1">
                <label htmlFor="guardianPostalCode" className="text-white/70">
                  Postal Code
                </label>
                <input
                  type="text"
                  id="guardianPostalCode"
                  value={formData.guardianAddress?.postalCode || ''}
                  onChange={(e) => onFormDataChange({
                    guardianAddress: { ...formData.guardianAddress, postalCode: e.target.value }
                  })}
                  className="bg-white/10 text-white border border-white/20 rounded-lg p-2 focus:outline-none focus:border-aaa-orange"
                  required
                />
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}