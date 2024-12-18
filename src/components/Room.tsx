import { useState } from 'react';
import { Room as RoomType, PricingOption } from '../types/Property';
import { PricingSelector } from './PricingSelector';

interface RoomProps {
  room: RoomType;
  onSelect?: (room: RoomType, pricing: PricingOption) => void;
  selected?: boolean;
}

export function Room({ room, onSelect, selected }: RoomProps) {
  const [isPricingSelectorOpen, setIsPricingSelectorOpen] = useState(false);
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [selectedPricing, setSelectedPricing] = useState<PricingOption | null>(null);

  const handlePricingSelect = (pricing: PricingOption) => {
    setSelectedPricing(pricing);
    setIsPricingSelectorOpen(false);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (selectedPricing) {
      onSelect?.(room, selectedPricing);
      setShowConfirmation(false);
      setSelectedPricing(null);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setSelectedPricing(null);
  };

  const handleClick = (e: React.MouseEvent) => {
    e.preventDefault();
    e.stopPropagation(); // Stop event bubbling
    if (!room.isBooked) {
      setIsPricingSelectorOpen(true);
    }
  };

  return (
    <>
      <button
        onClick={handleClick}
        className={`relative flex h-24 w-full flex-col items-center justify-center rounded-lg border p-4 transition-all ${
          room.isBooked
            ? 'cursor-not-allowed border-red-500/50 bg-red-500/10'
            : selected
            ? 'border-aaa-orange bg-white/10'
            : 'border-white/20 bg-white/5 hover:border-aaa-orange/50 hover:bg-white/10'
        }`}
        disabled={room.isBooked}
      >
        <span className="text-lg font-semibold text-aaa-orange">{room.number}</span>
        <span className="mt-1 text-sm text-white/60">
          {room.isBooked ? 'Booked' : 'Available'}
        </span>
      </button>

      <PricingSelector
        isOpen={isPricingSelectorOpen}
        onClose={() => setIsPricingSelectorOpen(false)}
        onSelect={handlePricingSelect}
      />

      {showConfirmation && selectedPricing && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-aaa-gray p-6 text-white shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-aaa-orange">Confirm Room Selection</h3>
            <div className="mb-6 space-y-2">
              <p>Room Number: {room.number}</p>
              <p>Price: R{selectedPricing.price} ({selectedPricing.period})</p>
            </div>
            <div className="flex justify-end space-x-4">
              <button
                onClick={handleCancel}
                className="rounded-lg border border-white/20 bg-white/5 px-4 py-2 text-sm font-medium text-white hover:bg-white/10"
              >
                Cancel
              </button>
              <button
                onClick={handleConfirm}
                className="rounded-lg bg-aaa-orange px-4 py-2 text-sm font-medium text-white hover:bg-aaa-orange/90"
              >
                Confirm
              </button>
            </div>
          </div>
        </div>
      )}
    </>
  );
}
