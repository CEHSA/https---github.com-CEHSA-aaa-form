import { FormData } from '../../types/FormData';

interface LessorDetailsProps {
  formData: FormData;
  onFormDataChange: (data: Partial<FormData>) => void;
}

export function LessorDetails({ formData, onFormDataChange }: LessorDetailsProps) {
  const handleInputChange = (field: keyof FormData) => (e: React.ChangeEvent<HTMLInputElement>) => {
    onFormDataChange({ [field]: e.target.value });
  };

  return (
    <div className="min-h-[500px] sm:min-h-[600px] md:min-h-[800px] flex flex-col">
      <div className="space-y-6 text-aaa-white">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">LESSOR DETAILS</h2>

        <div className="border border-white/20 rounded-lg bg-white/5 p-6 space-y-4">
          <div>
            <label className="text-sm text-white/60">Name</label>
            <input
              type="text"
              value={formData.lessorName}
              onChange={handleInputChange('lessorName')}
              className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Registration Number</label>
            <input
              type="text"
              value={formData.registrationNo}
              onChange={handleInputChange('registrationNo')}
              className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Email</label>
            <input
              type="email"
              value={formData.lessorEmail}
              onChange={handleInputChange('lessorEmail')}
              className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white"
            />
          </div>

          <div>
            <label className="text-sm text-white/60">Phone</label>
            <input
              type="tel"
              value={formData.lessorPhone}
              onChange={handleInputChange('lessorPhone')}
              className="w-full bg-white/10 border border-white/20 rounded-md p-2 text-white"
            />
          </div>
        </div>
      </div>
    </div>
  );
}