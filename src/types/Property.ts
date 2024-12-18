export type RoomType = 'single' | 'sharing';
export type PaymentPeriod = 'monthly' | 'annually';

export interface PricingOption {
  id: string;
  name: string;
  period: 'month' | 'year';
  type: 'Single' | 'Sharing';
  price: number;
}

export interface Room {
  id: string;
  name: string;
  number: string;
  type: RoomType;
  isBooked: boolean;
  floor: number;
  available: boolean;
}

export interface Property {
  id: string;
  name: string;
  address: string;
  rooms: Room[];
}

export const PRICING_OPTIONS: PricingOption[] = [
  { id: '1', name: '', period: 'month', type: 'Single', price: 4500 },
  { id: '2', name: '', period: 'month', type: 'Sharing', price: 4140 },
  { id: '3', name: '', period: 'year', type: 'Single', price: 45000 },
  { id: '4', name: '', period: 'year', type: 'Sharing', price: 41400 }
];