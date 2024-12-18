import { type FC } from 'react';

interface CoverPageProps {
  formData: {
    lessorName: string;
    lesseeName: string;
  };
}

export const CoverPage: FC<CoverPageProps> = ({ formData }) => {
  return (
    <div className="flex flex-col items-center justify-center min-h-[500px] sm:min-h-[600px] md:min-h-[800px] bg-aaa-gray text-aaa-white p-4 sm:p-6 md:p-8">
      <div className="max-w-3xl w-full space-y-8 sm:space-y-12 md:space-y-16 text-center relative">
        {/* Background Logo */}
        <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
          <img 
            src="/assets/aaa-logo.png"
            alt="AAA Student Rentals"
            className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] object-contain transform -rotate-12"
          />
        </div>

        {/* Content */}
        <div className="relative pt-6 sm:pt-8 md:pt-12">
          <h1 className="text-2xl sm:text-3xl md:text-4xl font-bold mb-16 sm:mb-24 md:mb-32 tracking-wide text-aaa-orange">
            STANDARDISED FIXED-TERM
            <span className="block mt-2 text-aaa-white">LEASE AGREEMENT</span>
          </h1>

          <h2 className="text-xl sm:text-2xl mb-12 sm:mb-16 md:mb-24 font-medium text-aaa-white">
            BETWEEN
          </h2>

          <div className="mb-12 sm:mb-16 md:mb-24">
            <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4 font-medium text-aaa-orange">
              {formData.lessorName || 'THE PRIVATE ACCOMMODATION PROVIDER'}
            </h3>
            <p className="text-lg sm:text-xl text-aaa-white">
              ("LESSOR")
            </p>
          </div>

          <h2 className="text-xl sm:text-2xl mb-12 sm:mb-16 md:mb-24 font-medium text-aaa-white">
            AND
          </h2>

          <div>
            <h3 className="text-xl sm:text-2xl mb-2 sm:mb-4 font-medium text-aaa-orange">
              {formData.lesseeName || 'THE NSFAS-FUNDED STUDENT'}
            </h3>
            <p className="text-lg sm:text-xl text-aaa-white">
              ("LESSEE")
            </p>
          </div>
        </div>
      </div>
    </div>
  );
};
