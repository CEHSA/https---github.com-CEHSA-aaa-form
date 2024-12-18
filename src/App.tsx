import { useState } from 'react';
import { Check } from 'lucide-react';
import { FormData } from './types/FormData';
import { Property, PricingOption } from './types/Property';
import type { Room } from './types/Property';
import { LesseeDetails } from './components/FormSteps/LesseeDetails';
import { GuardianDetails } from './components/FormSteps/GuardianDetails';
import { LeaseDetails } from './components/FormSteps/LeaseDetails';
import { BankingDetails } from './components/FormSteps/BankingDetails';
import { DirectMarketing } from './components/FormSteps/DirectMarketing';
import { ReviewSection } from './components/FormSteps/ReviewSection';
import { TermsAndConditions } from './components/FormSteps/TermsAndConditions';
import { CoverPage } from './components/CoverPage';
import { LessorDetails } from './components/FormSteps/LessorDetails';
import { RoomSelectionStep } from './components/FormSteps/RoomSelectionStep';
import { optionalExtras } from './data/optionalExtras';
import { useForm, FormProvider } from 'react-hook-form';

function App() {
  const initialFormData: FormData = {
    lesseeName: '',
    lesseeIdNumber: '',
    lesseeEmail: '',
    lesseePhone: '',
    physicalAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: ''
    },
    lessorName: '',
    registrationNo: '',
    lessorEmail: '',
    lessorPhone: '',
    enrolledCourse: '',
    institution: '',
    courseName: '',
    yearOfStudy: '',
    studentNumber: '',
    guardianName: '',
    guardianId: '',
    relationship: '',
    guardianEmail: '',
    guardianPhone: '',
    guardianAddress: {
      street: '',
      city: '',
      state: '',
      postalCode: ''
    },
    email: '',
    phone: '',
    alternativeContact: '',
    contactPreference: 'email',
    leaseType: 'fixed',
    leaseStartDate: '',
    leaseEndDate: '',
    keyReturnDate: '',
    keyReturnTime: '',
    accountHolder: '',
    bank: '',
    accountNumber: '',
    branchCode: '',
    branchName: '',
    selectedProperty: undefined,
    selectedRoom: undefined,
    selectedPricing: undefined,
    selectedExtras: [],
    nsfasNumber: '',
    directMarketing: false,
    acceptedTerms: false,
    rentalType: undefined,
  };

  const [formData, setFormData] = useState(initialFormData);

  const [currentStep, setCurrentStep] = useState(0);

  const handlePropertySelect = (property: Property) => {
    updateFormData({
      selectedProperty: property,
      selectedRoom: undefined,
      selectedPricing: undefined,
      selectedExtras: [] // Reset extras when property changes
    });
  };

  const handleRoomSelect = (room: Room) => {
    updateFormData({ selectedRoom: room });
  };

  const handlePricingSelect = (pricing: PricingOption) => {
    updateFormData({ selectedPricing: pricing, rentalType: pricing.period.toLowerCase() as 'month' | 'year' });
  };

  const updateFormData = (data: Partial<FormData>) => {
    setFormData(prev => ({ ...prev, ...data }));
  };

  const handleNext = () => {
    setCurrentStep(prev => Math.min(prev + 1, steps.length - 1));
  };

  const handleBack = () => {
    setCurrentStep(prev => Math.max(prev - 1, 0));
  };

  const steps = [
    { name: 'Cover Page' },
    { name: 'Lessor Details' },
    { name: 'Lessee Details' },
    { name: 'Guardian Details' },
    { name: 'Street and Room Selection' },
    { name: 'Lease Details' },
    { name: 'Banking Details' },
    { name: 'Direct Marketing' },
    { name: 'Terms and Conditions' },
    { name: 'Review' }
  ];

  const handleFormDataChange = (newData: Partial<FormData>) => {
    setFormData((prevData) => ({
      ...prevData,
      ...newData,
    }));
  };

  const methods = useForm({
    defaultValues: formData,
    mode: 'onBlur'
  });

  return (
    <div className="min-h-screen bg-aaa-gray text-aaa-white relative overflow-hidden">
      {/* Background Logo */}
      <div className="absolute inset-0 flex items-center justify-center opacity-10 pointer-events-none">
        <img 
          src="/assets/aaa-logo.png"
          alt="AAA Student Rentals"
          className="w-[300px] h-[300px] md:w-[600px] md:h-[600px] object-contain transform -rotate-12"
        />
      </div>

      {/* Content Container */}
      <div className="relative py-4 px-3 sm:py-8 sm:px-4 md:py-12 md:px-6">
        <div className="max-w-3xl mx-auto space-y-4 sm:space-y-6">
          {/* Progress Steps - Scrollable on mobile */}
          <nav className="flex justify-start sm:justify-center overflow-x-auto -mx-4 px-4 no-scrollbar">
            <ol className="flex items-center min-w-max px-2">
              {steps.map((step, index) => (
                <li key={step.name} className="flex items-center">
                  <div className={`flex items-center justify-center w-5 h-5 sm:w-7 sm:h-7 rounded-full text-xs sm:text-sm ${
                    currentStep > index
                      ? 'bg-aaa-orange text-white'
                      : currentStep === index
                      ? 'bg-aaa-orange text-white'
                      : 'bg-white/20 text-white'
                  }`}>
                    {currentStep > index ? (
                      <Check className="w-3 h-3 sm:w-4 sm:h-4" />
                    ) : (
                      <span>{index + 1}</span>
                    )}
                  </div>
                  {index < steps.length - 1 && (
                    <div className="mx-1 sm:mx-2 w-4 sm:w-8 h-0.5 bg-white/20"></div>
                  )}
                </li>
              ))}
            </ol>
          </nav>

          {/* Form Content */}
          <div className="min-h-[500px] sm:min-h-[600px] md:min-h-[800px] bg-aaa-gray">
            <div className="h-full">
              <div className="space-y-6">
                <div className="bg-aaa-orange/5 p-6 rounded-lg shadow-[0_4px_0_0_rgba(255,126,33,0.3)] border border-aaa-orange/20 min-h-[600px] transition-all hover:shadow-[0_6px_0_0_rgba(255,126,33,0.3)] hover:translate-y-[-2px]">
                  <FormProvider {...methods}>
                    {currentStep === 0 && (
                      <CoverPage formData={formData} />
                    )}

                    {currentStep === 1 && (
                      <LessorDetails 
                        formData={formData}
                        onFormDataChange={(data) => setFormData(prev => ({ ...prev, ...data }))}
                      />
                    )}

                    {currentStep === 2 && (
                        <LesseeDetails
                          formData={formData}
                          onFormDataChange={updateFormData}
                        />
                    )}

                    {currentStep === 3 && (
                      <GuardianDetails
                        formData={formData}
                        onFormDataChange={updateFormData}
                      />
                    )}

                    {currentStep === 4 && (
                      <RoomSelectionStep
                        formData={formData}
                        onFormDataChange={updateFormData}
                        onPropertySelect={handlePropertySelect}
                        onRoomSelect={handleRoomSelect}
                        onPricingSelect={handlePricingSelect}
                      />
                    )}

                    {currentStep === 5 && (
                      <LeaseDetails
                        formData={formData}
                        onFormDataChange={updateFormData}
                      />
                    )}

                    {currentStep === 6  && (
                      <BankingDetails
                        formData={formData}
                        onFormDataChange={updateFormData}
                      />
                    )}

                    {currentStep === 7 && (
                      <DirectMarketing
                        formData={formData}
                        onFormDataChange={updateFormData}
                      />
                    )}

                    {currentStep === 8 && (
                      <TermsAndConditions
                        formData={formData}
                        onFormDataChange={handleFormDataChange}
                      />
                    )}

                    {currentStep === 9 && (
                      <ReviewSection
                        formData={formData}
                        availableExtras={optionalExtras}
                      />
                    )}
                  </FormProvider>
                </div>
              </div>

              {/* Property Selection Summary */}
              {formData.selectedProperty && formData.selectedRoom && formData.rentalType && (
                <div className="fixed bottom-0 left-0 right-0 bg-aaa-gray border-t border-aaa-orange/20 p-4">
                  <div className="max-w-7xl mx-auto px-4 sm:px-6 lg:px-8">
                    <p className="text-aaa-white text-sm">
                      <span className="text-aaa-orange font-semibold">Selected Property:</span> {formData.selectedProperty.address} |{' '}
                      <span className="text-aaa-orange font-semibold">Room:</span> {formData.selectedRoom.number} |{' '}
                      <span className="text-aaa-orange font-semibold">Pricing Option:</span> {formData.rentalType}
                    </p>
                  </div>
                </div>
              )}

              <div className="mt-8 flex justify-between">
                {currentStep > 0 && currentStep < 10 && (
                  <button
                    type="button"
                    onClick={handleBack}
                    className="w-full sm:w-auto bg-white/10 text-white px-6 py-3 sm:py-2 rounded-md hover:bg-white/20 transition-colors text-base sm:text-sm"
                  >
                    Previous
                  </button>
                )}
                {currentStep < 9 ? (
                  <button
                    type="button"
                    onClick={handleNext}
                    className={`w-full sm:w-auto bg-aaa-orange text-white px-6 py-3 sm:py-2 rounded-md hover:bg-opacity-90 transition-colors text-base sm:text-sm ${currentStep === 0 ? 'sm:ml-auto' : ''}`}
                  >
                    Next
                  </button>
                ) : null}
              </div>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
}

export default App;