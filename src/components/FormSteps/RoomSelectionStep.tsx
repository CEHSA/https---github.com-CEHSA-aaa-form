import { FormData } from '../../types/FormData';
import { Property, Room, PricingOption, RoomType } from '../../types/Property';
import { PropertySelector } from '../PropertySelector';
import { OptionalExtrasSelector } from '../OptionalExtrasSelector';

interface RoomSelectionStepProps {
  formData: FormData;
  onFormDataChange: (newData: Partial<FormData>) => void;
  onPropertySelect: (property: Property) => void;
  onRoomSelect: (room: Room) => void;
  onPricingSelect: (pricing: PricingOption) => void;
}

export function RoomSelectionStep({
  formData,
  onFormDataChange,
  onPropertySelect,
  onRoomSelect,
  onPricingSelect
}: RoomSelectionStepProps) {
  const selectedProperty = formData.selectedProperty ? {
    ...formData.selectedProperty,
    rooms: formData.selectedProperty.rooms.map(room => ({
      ...room,
      name: room.number,
      isBooked: !room.available,
      type: room.type as RoomType
    }))
  } : null;

  const selectedRoom = formData.selectedRoom ? {
    ...formData.selectedRoom,
    name: formData.selectedRoom.number,
    isBooked: !formData.selectedRoom.available,
    type: formData.selectedRoom.type as RoomType
  } : null;

  return (
    <div className="space-y-4 max-w-2xl mx-auto px-4">
      <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">Street and Room Selection</h2>
        <PropertySelector
          selectedProperty={selectedProperty}
          selectedRoom={selectedRoom}
          onPropertySelect={onPropertySelect}
          onRoomSelect={onRoomSelect}
          onPricingSelect={onPricingSelect}
        />
      </div>

      <div className="bg-white/5 p-4 sm:p-6 rounded-lg">
        <h2 className="text-xl font-semibold text-aaa-orange mb-4">Optional Extras</h2>
        <OptionalExtrasSelector
          selectedExtras={formData.selectedExtras || []}
          onExtrasChange={(extras) => onFormDataChange({ selectedExtras: extras })}
        />
      </div>
    </div>
  );
}
