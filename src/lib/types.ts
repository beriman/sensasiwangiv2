export type ProductCategory = 'Parfum' | 'Raw Material' | 'Tools' | 'Misc' | 'Course';

export interface SambatanDetails {
  isActive: boolean;
  targetParticipants: number;
  currentParticipants: number;
  deadline: string; // ISO 8601 date string
  sambatanPrice: number;
  minOrder: number;
  maxOrder: number;
}

export interface ProductVariant {
  id: string; // Unique ID for the variant, e.g., product.id + '-' + name
  name: string; // e.g., "50ml", "10ml Decant"
  price: number;
  stock: number;
}

export interface Product {
  id: string;
  name: string;
  description: string;
  category: ProductCategory;
  imageUrl: string;
  imageHint: string;
  properties: Record<string, string>;
  perfumerProfileSlug?: string;
  sambatan?: SambatanDetails;
  variants: ProductVariant[]; // Replaces top-level price and stock
  isListed: boolean;
}

export interface CartItem extends Product {
  quantity: number;
  variant: ProductVariant; // Add selected variant to cart item
}
