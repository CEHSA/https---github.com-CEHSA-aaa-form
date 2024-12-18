import React from 'react';
import { FormData } from '../../types/FormData';

interface BankingDetailsProps {
  formData: Pick<FormData, 'accountHolder' | 'bank' | 'accountNumber' | 'branchCode' | 'branchName'>;
  onFormDataChange: (newData: Partial<FormData>) => void;
}

const banks = [
  { value: 'absa', label: 'ABSA', image: 'https://www.aaarent.co.za/wp-content/uploads/2024/09/absa-2.jpg' },
  { value: 'fnb', label: 'FNB', image: 'https://www.aaarent.co.za/wp-content/uploads/2024/09/FNB_Color-1-1.png' },
  { value: 'standard', label: 'STANDARD BANK', image: 'https://www.aaarent.co.za/wp-content/uploads/2024/09/unnamed-removebg-preview.png' },
  { value: 'capitec', label: 'CAPITEC BANK', image: 'https://www.aaarent.co.za/wp-content/uploads/2024/09/images-2-1.png' },
  { value: 'nedbank', label: 'NEDBANK', image: 'https://www.aaarent.co.za/wp-content/uploads/2024/09/nedbank-2.jpg' },
  { value: 'tyme', label: 'TYMEBANK', image: 'https://www.aaarent.co.za/wp-content/uploads/2024/09/tyme.png' }
];

export function BankingDetails({ formData, onFormDataChange }: BankingDetailsProps) {
  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement | HTMLSelectElement>) => {
    onFormDataChange({ [e.target.name]: e.target.value });
  };

  return (
    <div className="h-full">
      <div className="space-y-6 text-aaa-white">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">NOMINATED BANK ACCOUNT DEBIT ORDER AUTHORISATION BY STUDENT</h2>
        <div className="space-y-4">
          <div>
            <label className="block text-sm font-semibold text-aaa-orange mb-1">
              Name of Account Holder
            </label>
            <p className="text-xs text-aaa-white/80 mb-1">Enter the full name as it appears on your bank account</p>
            <input
              type="text"
              name="accountHolder"
              value={formData.accountHolder}
              onChange={handleInputChange}
              required
              placeholder="Name of Account Holder"
              className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-aaa-orange mb-1">Bank</label>
            <p className="text-xs text-aaa-white/80 mb-2">Select your banking institution</p>
            <select
              name="bank"
              value={formData.bank}
              onChange={handleInputChange}
              required
              className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm"
            >
              <option value="">Select a bank</option>
              {banks.map((bank) => (
                <option key={bank.value} value={bank.value}>
                  {bank.label}
                </option>
              ))}
            </select>
          </div>

          <div>
            <label className="block text-sm font-semibold text-aaa-orange mb-1">
              Bank Account Number
            </label>
            <p className="text-xs text-aaa-white/80 mb-1">Enter your bank account number</p>
            <input
              type="text"
              name="accountNumber"
              value={formData.accountNumber}
              onChange={handleInputChange}
              required
              placeholder="Account number"
              className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-aaa-orange mb-1">
              Branch Code
            </label>
            <p className="text-xs text-aaa-white/80 mb-1">Enter your bank branch code</p>
            <input
              type="text"
              name="branchCode"
              value={formData.branchCode}
              onChange={handleInputChange}
              required
              placeholder="Branch code"
              className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
            />
          </div>

          <div>
            <label className="block text-sm font-semibold text-aaa-orange mb-1">
              Branch Name
            </label>
            <p className="text-xs text-aaa-white/80 mb-1">Enter your bank branch name</p>
            <input
              type="text"
              name="branchName"
              value={formData.branchName}
              onChange={handleInputChange}
              required
              placeholder="Branch name"
              className="mt-1 block w-full rounded-md bg-white/10 border-white/20 text-white shadow-sm focus:border-aaa-orange focus:ring-aaa-orange sm:text-sm placeholder-white/50"
            />
          </div>
        </div>
      </div>
    </div>
  );
}