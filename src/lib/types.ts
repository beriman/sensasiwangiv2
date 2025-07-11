export type ProductCategory = 'Parfum' | 'Raw Material' | 'Tools' | 'Misc';

export interface SambatanDetails {
  isActive: boolean;
  targetParticipants: number;
  currentParticipants: number;
  deadline: string; // ISO 8601 date string
  sambatanPrice: number;
  minOrder: number;
  maxOrder: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  price: number;
  category: ProductCategory;
  imageUrl: string;
  imageHint: string;
  properties: Record<string, string>;
  perfumerProfileSlug?: string;
  sambatan?: SambatanDetails;
}

export interface CartItem extends Product {
  quantity: number;
}
