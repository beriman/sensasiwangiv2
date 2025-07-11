// src/hooks/use-wishlist.ts
'use client';

import { create } from 'zustand';
import { persist, createJSONStorage } from 'zustand/middleware';
import type { Product } from '@/lib/types';
import { toast } from '@/hooks/use-toast';

interface WishlistState {
  items: Product[];
  toggleWishlist: (product: Product) => void;
  isInWishlist: (productId: string) => boolean;
}

export const useWishlist = create(
  persist<WishlistState>(
    (set, get) => ({
      items: [],
      
      toggleWishlist: (product) => {
        const { items } = get();
        const existingItem = items.find((item) => item.id === product.id);

        if (existingItem) {
          const updatedItems = items.filter((item) => item.id !== product.id);
          set({ items: updatedItems });
          toast({
            title: 'Removed from Wishlist',
            description: `${product.name} has been removed from your wishlist.`,
          });
        } else {
          const updatedItems = [...items, product];
          set({ items: updatedItems });
          toast({
            title: 'Added to Wishlist',
            description: `${product.name} has been added to your wishlist.`,
          });
        }
      },

      isInWishlist: (productId) => {
        const { items } = get();
        return items.some((item) => item.id === productId);
      },
    }),
    {
      name: 'wishlist-storage', // unique name for localStorage
      storage: createJSONStorage(() => localStorage), // use localStorage
    }
  )
);
