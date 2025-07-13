// src/hooks/use-cart.ts
'use client';

import { create } from 'zustand';
import type { CartItem, Product, ProductVariant } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface CartState {
  items: CartItem[];
  addItem: (product: Product, variant: ProductVariant) => void;
  removeItem: (variantId: string) => void;
  updateQuantity: (variantId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const updateTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: items.reduce((total, item) => total + item.variant.price * item.quantity, 0),
});

export const useCart = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  
  addItem: (product, variant) => {
    const { items } = get();
    // A cart item is now uniquely identified by its variant ID
    const existingItem = items.find((item) => item.variant.id === variant.id);

    let updatedItems;
    if (existingItem) {
      if (product.category === 'Course') {
        toast({
          title: 'Sudah di Keranjang',
          description: `${product.name} sudah ada di keranjang Anda.`,
        });
        return; // Prevent adding more than one of the same course
      }
      updatedItems = items.map((item) =>
        item.variant.id === variant.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...items, { ...product, variant: variant, quantity: 1 }];
    }
    
    set({ items: updatedItems, ...updateTotals(updatedItems) });
    toast({
      title: 'Ditambahkan ke Keranjang',
      description: `${product.name} (${variant.name}) telah ditambahkan ke keranjang Anda.`,
    });
  },

  removeItem: (variantId) => {
    const updatedItems = get().items.filter((item) => item.variant.id !== variantId);
    set({ items: updatedItems, ...updateTotals(updatedItems) });
  },

  updateQuantity: (variantId, quantity) => {
    let updatedItems;
    if (quantity <= 0) {
      updatedItems = get().items.filter((item) => item.variant.id !== variantId);
    } else {
      updatedItems = get().items.map((item) =>
        item.variant.id === variantId ? { ...item, quantity } : item
      );
    }
    set({ items: updatedItems, ...updateTotals(updatedItems) });
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },
}));
