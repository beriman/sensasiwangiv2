export type ProductCategory = 'Parfum' | 'Raw Material' | 'Tools';

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
}

export interface CartItem extends Product {
  quantity: number;
}
