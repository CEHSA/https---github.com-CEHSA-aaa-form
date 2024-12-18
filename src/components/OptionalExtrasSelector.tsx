import { useState } from 'react';
import type { OptionalExtra } from '../types/extras';
import { optionalExtras } from '../data/optionalExtras';

interface OptionalExtrasSelectorProps {
  selectedExtras: OptionalExtra[];
  onExtrasChange: (extras: OptionalExtra[]) => void;
}

export function OptionalExtrasSelector({ selectedExtras, onExtrasChange }: OptionalExtrasSelectorProps) {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredExtras = optionalExtras.filter(extra =>
    extra.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
    extra.description.toLowerCase().includes(searchTerm.toLowerCase())
  );

  const toggleExtra = (extra: OptionalExtra) => {
    const isSelected = selectedExtras.some(selected => selected.id === extra.id);
    if (isSelected) {
      onExtrasChange(selectedExtras.filter(selected => selected.id !== extra.id));
    } else {
      onExtrasChange([...selectedExtras, extra]);
    }
  };

  const getTotalMonthlyPrice = () => {
    return selectedExtras.reduce((total, extra) => total + extra.pricePerMonth, 0);
  };

  return (
    <div className="space-y-4">
      <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">Optional Extras</h2>
        
        <div className="space-y-4">
          <div className="relative">
            <input
              type="text"
              placeholder="Search extras..."
              value={searchTerm}
              onChange={(e) => setSearchTerm(e.target.value)}
              className="w-full p-3 bg-white/10 rounded-lg text-white placeholder-white/50 focus:outline-none focus:ring-2 focus:ring-aaa-orange"
            />
          </div>

          <div className="grid grid-cols-1 md:grid-cols-2 gap-4">
            {filteredExtras.map(extra => {
              const isSelected = selectedExtras.some(selected => selected.id === extra.id);
              return (
                <div
                  key={extra.id}
                  className={`p-4 rounded-lg cursor-pointer transition-all duration-200 ${
                    isSelected
                      ? 'bg-aaa-orange/20 border-2 border-aaa-orange'
                      : 'bg-white/10 border-2 border-transparent hover:border-aaa-orange/50'
                  }`}
                  onClick={() => toggleExtra(extra)}
                >
                  <div className="flex justify-between items-start">
                    <div>
                      <h3 className="font-semibold text-white">{extra.name}</h3>
                      <p className="text-sm text-white/70">{extra.description}</p>
                    </div>
                    <div className="text-right">
                      <p className="text-lg font-semibold text-aaa-orange">
                        R{extra.pricePerMonth}
                        <span className="text-sm text-white/50">/month</span>
                      </p>
                    </div>
                  </div>
                </div>
              );
            })}
          </div>
        </div>

        {selectedExtras.length > 0 && (
          <div className="mt-6 p-4 bg-white/10 rounded-lg">
            <div className="flex justify-between items-center">
              <div>
                <h3 className="font-semibold text-white">Selected Extras</h3>
                <p className="text-sm text-white/70">{selectedExtras.length} item(s) selected</p>
              </div>
              <div className="text-right">
                <p className="text-lg font-semibold text-aaa-orange">
                  R{getTotalMonthlyPrice()}
                  <span className="text-sm text-white/50">/month</span>
                </p>
              </div>
            </div>
          </div>
        )}
      </div>
    </div>
  );
}
