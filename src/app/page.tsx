'use client';

import { useState, useMemo } from 'react';
import type { Product } from '@/lib/types';
import { products as allProducts } from '@/data/products';
import { AppHeader } from '@/components/header';
import { Filters } from '@/components/filters';
import { ProductGrid } from '@/components/product-grid';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';

export default function Home() {
  const [category, setCategory] = useState<string>('Parfum');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  const handleFilterChange = (filterType: string, value: string) => {
    setFilters((prevFilters) => {
      const currentFilterValues = prevFilters[filterType] || [];
      const newFilterValues = currentFilterValues.includes(value)
        ? currentFilterValues.filter((v) => v !== value)
        : [...currentFilterValues, value];
      
      if (newFilterValues.length === 0) {
        const { [filterType]: _, ...rest } = prevFilters;
        return rest;
      }

      return {
        ...prevFilters,
        [filterType]: newFilterValues,
      };
    });
  };

  const filteredProducts = useMemo(() => {
    return allProducts.filter((product) => {
      const categoryMatch = category === 'All' || product.category === category;
      
      const searchTermMatch =
        searchTerm.trim() === '' ||
        product.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
        product.description.toLowerCase().includes(searchTerm.toLowerCase());

      const filtersMatch = Object.entries(filters).every(([key, values]) => {
        if (values.length === 0) return true;
        const productValue = product.properties[key];
        if (!productValue) return false;
        return values.includes(productValue);
      });

      return categoryMatch && searchTermMatch && filtersMatch;
    });
  }, [category, searchTerm, filters]);
  
  const productsForFilter = useMemo(() => {
    return allProducts.filter(p => category === 'All' || p.category === category);
  }, [category]);


  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader
        category={category}
        setCategory={setCategory}
        searchTerm={searchTerm}
        setSearchTerm={setSearchTerm}
      />
      <div className="container relative mx-auto grid grid-cols-1 gap-8 px-4 py-8 md:grid-cols-4">
        <aside className="md:col-span-1">
          <Filters
            category={category}
            products={productsForFilter}
            activeFilters={filters}
            onFilterChange={handleFilterChange}
          />
        </aside>
        <main className="md:col-span-3">
          <ProductGrid products={filteredProducts} />
        </main>
        <PersonalizedRecommendations category={category} activeFilters={filters} />
      </div>
    </div>
  );
}
