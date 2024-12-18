import { useState } from 'react';
import { Property, Room, PricingOption } from '../types/Property';
import { properties } from '../data/properties';
import { Room as RoomComponent } from './Room';

interface PropertySelectorProps {
  selectedProperty: Property | null;
  selectedRoom: Room | null;
  onPropertySelect: (property: Property) => void;
  onRoomSelect: (room: Room) => void;
  onPricingSelect: (pricing: PricingOption) => void;
}

export function PropertySelector({
  selectedProperty,
  selectedRoom,
  onPropertySelect,
  onRoomSelect,
  onPricingSelect
}: PropertySelectorProps) {
  const [showConfirmation, setShowConfirmation] = useState(false);
  const [propertyToConfirm, setPropertyToConfirm] = useState<Property | null>(null);

  const handlePropertyClick = (event: React.MouseEvent, property: Property) => {
    event.preventDefault(); // Prevent default button behavior
    event.stopPropagation(); // Stop event bubbling
    
    // Don't show confirmation if selecting the same property
    if (selectedProperty?.id === property.id) {
      return;
    }
    setPropertyToConfirm(property);
    setShowConfirmation(true);
  };

  const handleConfirm = () => {
    if (propertyToConfirm) {
      onPropertySelect(propertyToConfirm);
      setShowConfirmation(false);
      setPropertyToConfirm(null);
    }
  };

  const handleCancel = () => {
    setShowConfirmation(false);
    setPropertyToConfirm(null);
  };

  const handleRoomSelect = (room: Room, pricing: PricingOption) => {
    onRoomSelect(room);
    onPricingSelect(pricing);
  };

  return (
    <div className="flex flex-col" onClick={(e) => e.preventDefault()}>
      <div className="space-y-6 text-aaa-white">
        <div>
          <h2 className="text-xl font-semibold text-aaa-orange mb-4">STREET AND ROOM SELECTION</h2>
          <div className="grid grid-cols-1 gap-4 sm:grid-cols-2 lg:grid-cols-3">
            {properties.map((property) => (
              <button
                key={property.id}
                onClick={(e) => handlePropertyClick(e, property)}
                className={`rounded-lg border p-4 text-left transition-all ${
                  selectedProperty?.id === property.id
                    ? 'border-aaa-orange bg-white/10'
                    : 'border-white/20 bg-white/5 hover:border-aaa-orange/50'
                }`}
              >
                <h3 className="text-lg font-semibold text-aaa-orange">{property.address}</h3>
                <p className="mt-1 text-sm text-white/60">{property.rooms.length} rooms</p>
              </button>
            ))}
          </div>
        </div>

        {selectedProperty && (
          <div className="space-y-6">
            <div className="grid grid-cols-2 gap-4 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-6">
              {selectedProperty.rooms.map((room) => (
                <RoomComponent
                  key={room.id}
                  room={room}
                  onSelect={handleRoomSelect}
                  selected={selectedRoom?.id === room.id}
                />
              ))}
            </div>
          </div>
        )}
      </div>

      {showConfirmation && propertyToConfirm && (
        <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/50">
          <div className="w-full max-w-md rounded-lg bg-aaa-gray p-6 text-white shadow-lg">
            <h3 className="mb-4 text-xl font-semibold text-aaa-orange">Confirm Property Selection</h3>
            <div className="mb-6 space-y-2">
              <p>Are you sure you want to select this property?</p>
              <p className="text-aaa-orange">{propertyToConfirm.address}</p>
              {selectedProperty && (
                <p className="text-sm text-white/60">
                  Note: This will clear your current room selection.
                </p>
              )}
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
    </div>
  );
}