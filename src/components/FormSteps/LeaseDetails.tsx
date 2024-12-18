import React from 'react';
import { FormData } from '../../types/FormData';

interface LeaseDetailsProps {
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
}

export function LeaseDetails({ formData, onFormDataChange }: LeaseDetailsProps) {
  const handleLeaseTypeChange = (e: React.ChangeEvent<HTMLSelectElement>) => {
    const type = e.target.value as 'fixed' | 'month-to-month';
    onFormDataChange({ [e.target.name]: e.target.value });
    
    // Set default dates based on lease type
    const startDate = type === 'fixed' ? '2025-02-01' : '2025-01-01';
    const endDate = type === 'fixed' ? '2025-11-30' : '2025-12-30';
    
    onFormDataChange({
      leaseStartDate: startDate,
      leaseEndDate: endDate
    });
  };

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFormDataChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full">
      <div className="space-y-6 text-aaa-white">
        <div className="space-y-4">
          <div>
            <h2 className="text-xl font-semibold text-aaa-orange mb-2">LEASE DETAILS</h2>
          </div>

          <div>
            <label className="block text-sm font-semibold text-aaa-orange mb-1">
              NSFAS Number <span className="text-red-500">*</span>
            </label>
            <p className="text-xs text-aaa-white/80 mb-1">Required for payment processing - please enter a valid NSFAS number</p>
            <input
              type="text"
              name="nsfasNumber"
              value={formData.nsfasNumber || ''}
              onChange={handleInputChange}
              required
              aria-required="true"
              className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50 invalid:border-red-500 invalid:focus:border-red-500"
              placeholder="Enter your NSFAS number (Required)"
              pattern="[0-9]*"
              minLength={4}
              title="Please enter a valid NSFAS number (numbers only)"
              onInvalid={(e) => {
                const target = e.target as HTMLInputElement;
                if (!target.value) {
                  target.setCustomValidity('NSFAS number is required for payment processing');
                } else if (!/^[0-9]*$/.test(target.value)) {
                  target.setCustomValidity('NSFAS number must contain only numbers');
                } else {
                  target.setCustomValidity('');
                }
              }}
              onInput={(e) => {
                const target = e.target as HTMLInputElement;
                target.setCustomValidity('');
              }}
            />
          </div>

          {/* Lease Period Box */}
          <div className="bg-white/5 p-4 rounded-md border border-aaa-orange/20">
            <h3 className="text-sm font-semibold text-aaa-orange mb-3">LEASE PERIOD</h3>
            <select
              name="leaseType"
              value={formData.leaseType || ''}
              onChange={handleLeaseTypeChange}
              required
              className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm"
            >
              <option value="">Select lease type</option>
              <option value="fixed">Fixed</option>
              <option value="month-to-month">Month-to-Month</option>
            </select>
          </div>

          {/* Start and Termination Dates Box */}
          <div className="bg-white/5 p-4 rounded-md border border-aaa-orange/20">
            <h3 className="text-sm font-semibold text-aaa-orange mb-3">START AND TERMINATION DATES OF LEASE</h3>
            <p className="text-xs text-aaa-white mb-4">
              {formData.leaseType === 'fixed' ? (
                '1 February 2025 – 30 November 2025 (Fixed)'
              ) : formData.leaseType === 'month-to-month' ? (
                '1 January 2025 – 30 December 2025 (Month-to-Month)'
              ) : (
                'Please select a lease type'
              )}
            </p>
            
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-aaa-orange mb-1">
                  Lease Start Date
                </label>
                <input
                  type="date"
                  name="leaseStartDate"
                  value={formData.leaseStartDate || ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-aaa-orange mb-1">
                  Lease End Date
                </label>
                <input
                  type="date"
                  name="leaseEndDate"
                  value={formData.leaseEndDate || ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
                />
              </div>
            </div>
          </div>

          {/* Key Return Details Box */}
          <div className="bg-white/5 p-4 rounded-md border border-aaa-orange/20">
            <h3 className="text-sm font-semibold text-aaa-orange mb-3">KEY RETURN DETAILS</h3>
            <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
              <div>
                <label className="block text-sm font-semibold text-aaa-orange mb-1">
                  Key Return Date
                </label>
                <input
                  type="date"
                  name="keyReturnDate"
                  value={formData.keyReturnDate || ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
                />
              </div>

              <div>
                <label className="block text-sm font-semibold text-aaa-orange mb-1">
                  Key Return Time
                </label>
                <input
                  type="time"
                  name="keyReturnTime"
                  value={formData.keyReturnTime || ''}
                  onChange={handleInputChange}
                  required
                  className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
                />
              </div>
            </div>
          </div>

          {/* Cancellation Fee Box */}
          <div className="bg-white/5 p-4 rounded-md border border-aaa-orange/20">
            <h3 className="text-sm font-semibold text-aaa-orange mb-3">IMPORTANT NOTE: CANCELLATION FEE</h3>
            <p className="text-xs text-aaa-white leading-relaxed">
              MAXIMUM CANCELLATION penalty not less than <span className="text-aaa-orange font-semibold">3</span> month/s 
              but not more than <span className="text-aaa-orange font-semibold">6</span> months' rental 
              OR an amount of: <span className="text-aaa-orange font-semibold">R 10,000-00</span>
            </p>
          </div>

          {/* Additional Information Box */}
          <div className="bg-white/5 p-4 rounded-md border border-aaa-orange/20">
            <h3 className="text-sm font-semibold text-aaa-orange mb-3">ADDITIONAL INFORMATION</h3>
            <ul className="space-y-3 text-xs text-aaa-white">
              <li className="flex items-start">
                <span className="text-aaa-orange mr-2">•</span>
                <span>If a single room is not available a sharing room will be allocated</span>
              </li>
              <li className="flex items-start">
                <span className="text-aaa-orange mr-2">•</span>
                <span>MENTION COURSE ENROLLED FOR:</span>
                <input
                  type="text"
                  name="enrolledCourse"
                  value={formData.enrolledCourse}
                  onChange={handleInputChange}
                  required
                  className="ml-2 inline-block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
                />
              </li>
              <li className="flex items-start">
                <span className="text-aaa-orange mr-2">•</span>
                <span className="font-semibold">ANY BURSARY THAT IS NOT NSFAS NEEDS TO PAY THE FULL AMOUNT UP FRONT FOR THE ALLOCATED TERM OF THE LEASE AGREEMENT IN THE FIRST MONTH OF OCCUPATION.</span>
              </li>
            </ul>
          </div>
        </div>
      </div>
    </div>
  );
}