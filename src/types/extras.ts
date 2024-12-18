export interface OptionalExtra {
  id: string;
  name: string;
  description: string;
  pricePerMonth: number;
  period: 'month' | 'year';
}

export interface ExtraSelection {
  extraId: string;
  quantity: number;
}
