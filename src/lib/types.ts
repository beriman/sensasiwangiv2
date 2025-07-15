import type { BadgeCategory } from "@/data/badges";

export type ProductCategory = 'Parfum' | 'Raw Material' | 'Tools' | 'Misc' | 'Course' | 'Jasa';

export interface SambatanDetails {
  isActive: boolean;
  targetParticipants: number;
  currentParticipants: number;
  deadline: string; // ISO 8601 date string
  sambatanPrice: number;
  minOrder: number;
  maxOrder: number;
}

export type FulfillmentType = 'IN_STOCK' | 'PRE_ORDER' | 'MADE_TO_ORDER';

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
  product_variants?: ProductVariant[]; // Replaces top-level price and stock
  is_listed: boolean;
  created_by?: string;
  fulfillmentType?: FulfillmentType;
  preorderDate?: string; // ISO 8601 date string for estimated shipping
}

export interface CartItem extends Product {
  quantity: number;
  variant: ProductVariant; // Add selected variant to cart item
}

// Order Management Types
export interface OrderItem {
    id: string;
    name: string;
    quantity: number;
    price: number;
}

export interface OrderCustomer {
    name: string;
    email: string;
    address: string;
}

export type OrderStatus = 'Pesanan Diterima' | 'Dikirim' | 'Menunggu Konfirmasi' | 'Selesai' | 'Bermasalah' | 'Dibatalkan';

export interface ShippingInfo {
    provider: string;
    trackingNumber: string;
    shippedOn: string; // ISO 8601
}

export interface Order {
    id: string;
    customer: OrderCustomer;
    status: OrderStatus;
    date: string; // ISO 8601
    shippingDeadline: string; // ISO 8601
    total: number;
    items: OrderItem[];
    buyerConfirmationDeadline?: string; // Optional: for buyer confirmation window
    shippingInfo?: ShippingInfo;
}

export type ModeratorRole = 'Admin' | 'Marketplace' | 'School' | 'Forum' | 'Curation';

export type ProfileType = 'Perfumer' | 'Brand' | 'Store' | 'Buyer';

export interface CurationInfo {
  isCurated: boolean;
  curatedAt: string; // ISO 8601 date string
}

export interface Profile {
    slug: string;
    type: ProfileType;
    name: string;
    username: string;
    email: string;
    bio: string;
    profilePicture?: string;
    imageHint: string;
    followers?: number;
    following?: number;
    socials: {
      twitter?: string;
      instagram?: string;
      website?: string;
      tiktok?: string;
      youtube?: string;
      facebook?: string;
    };
    curation?: CurationInfo;
    moderatorRoles?: ModeratorRole[];
    badges?: Partial<Record<BadgeCategory, number>>;
  };
