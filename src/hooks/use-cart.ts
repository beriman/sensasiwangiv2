// src/hooks/use-cart.ts
'use client';

import { create } from 'zustand';
import type { CartItem, Product } from '@/lib/types';
import { useToast } from '@/hooks/use-toast';

interface CartState {
  items: CartItem[];
  addItem: (product: Product) => void;
  removeItem: (productId: string) => void;
  updateQuantity: (productId: string, quantity: number) => void;
  clearCart: () => void;
  totalItems: number;
  totalPrice: number;
}

const updateTotals = (items: CartItem[]) => ({
  totalItems: items.reduce((total, item) => total + item.quantity, 0),
  totalPrice: items.reduce((total, item) => total + item.price * item.quantity, 0),
});

export const useCart = create<CartState>((set, get) => ({
  items: [],
  totalItems: 0,
  totalPrice: 0,
  
  addItem: (product) => {
    const { toast } = useToast();
    const { items } = get();
    const existingItem = items.find((item) => item.id === product.id);

    let updatedItems;
    if (existingItem) {
      updatedItems = items.map((item) =>
        item.id === product.id ? { ...item, quantity: item.quantity + 1 } : item
      );
    } else {
      updatedItems = [...items, { ...product, quantity: 1 }];
    }
    
    set({ items: updatedItems, ...updateTotals(updatedItems) });
    toast({
      title: 'Added to cart',
      description: `${product.name} has been added to your cart.`,
    });
  },

  removeItem: (productId) => {
    const updatedItems = get().items.filter((item) => item.id !== productId);
    set({ items: updatedItems, ...updateTotals(updatedItems) });
  },

  updateQuantity: (productId, quantity) => {
    let updatedItems;
    if (quantity <= 0) {
      updatedItems = get().items.filter((item) => item.id !== productId);
    } else {
      updatedItems = get().items.map((item) =>
        item.id === productId ? { ...item, quantity } : item
      );
    }
    set({ items: updatedItems, ...updateTotals(updatedItems) });
  },

  clearCart: () => {
    set({ items: [], totalItems: 0, totalPrice: 0 });
  },
}));
