import { FC } from 'react';
import { PricingOption, PRICING_OPTIONS } from '../types/Property';

interface PricingSelectorProps {
  onSelect: (option: PricingOption) => void;
  onClose: () => void;
  isOpen: boolean;
}

export const PricingSelector: FC<PricingSelectorProps> = ({ onSelect, onClose, isOpen }) => {
  if (!isOpen) return null;

  const getPeriodDisplay = (period: 'month' | 'year') => {
    return period === 'month' ? 'Monthly' : 'Annual';
  };

  return (
    <div className="fixed inset-0 bg-black/90 backdrop-blur-sm flex items-center justify-center z-50">
      <div className="bg-[#111] border border-white/20 p-6 rounded-lg shadow-xl max-w-md w-full">
        <h2 className="text-2xl font-bold mb-4 text-aaa-orange">Select Pricing Option</h2>
        <div className="grid grid-cols-1 gap-4">
          {PRICING_OPTIONS.map((option) => (
            <button
              key={option.id}
              onClick={() => onSelect(option)}
              className="p-4 border border-white/20 rounded-lg bg-white/5 hover:bg-white/10 hover:border-aaa-orange/50 transition-all"
            >
              <div className="flex justify-between items-center">
                <div>
                  <span className="font-medium text-white">
                    {getPeriodDisplay(option.period)} - {option.type}
                  </span>
                </div>
                <div className="text-lg font-bold text-aaa-orange">
                  R{option.price.toFixed(2)}
                </div>
              </div>
            </button>
          ))}
        </div>
        <button
          onClick={onClose}
          className="mt-4 w-full py-2 border border-white/20 rounded-lg bg-white/5 text-white hover:bg-white/10 hover:border-aaa-orange/50 transition-all"
        >
          Cancel
        </button>
      </div>
    </div>
  );
};
