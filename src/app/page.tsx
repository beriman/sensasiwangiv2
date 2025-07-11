
'use client';

import { useState, useMemo, useEffect } from 'react';
import { useSearchParams } from 'next/navigation';
import type { Product } from '@/lib/types';
import { products as allProducts } from '@/data/products';
import { AppHeader } from '@/components/header';
import { Filters } from '@/components/filters';
import { ProductGrid } from '@/components/product-grid';
import { PersonalizedRecommendations } from '@/components/personalized-recommendations';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Leaf, FlaskConical, Wrench, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { cn } from '@/lib/utils';


const categories = [
  { name: 'Parfum', icon: Leaf },
  { name: 'Raw Material', icon: FlaskConical },
  { name: 'Tools', icon: Wrench },
];

export default function Home() {
  const searchParams = useSearchParams();
  const brandQuery = searchParams.get('brand');

  const [category, setCategory] = useState<string>('Parfum');
  const [searchTerm, setSearchTerm] = useState('');
  const [filters, setFilters] = useState<Record<string, string[]>>({});

  useEffect(() => {
    if (brandQuery) {
      setCategory('Parfum'); // Assume brands are for perfumes
      setFilters(prev => ({ ...prev, 'Brand': [brandQuery] }));
    }
  }, [brandQuery]);

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
        if(key === 'Brand' && product.category !== 'Parfum') return true;
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
      <AppHeader />
      <div className="container mx-auto px-4 py-8">
        <div className="mb-8 flex flex-col items-center justify-between gap-6 md:flex-row">
            <Tabs value={category} onValueChange={setCategory} className="w-full md:w-auto">
              <TabsList className="h-12 w-full rounded-xl bg-transparent p-1 shadow-neumorphic-inset md:w-auto">
                {categories.map((cat) => (
                  <TabsTrigger
                    key={cat.name}
                    value={cat.name}
                    className={cn(
                      'h-full flex-1 rounded-lg px-4 py-2 text-foreground/70 transition-all duration-300 data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active',
                      'data-[state=active]:bg-accent-gradient',
                      'hover:bg-background/50 hover:shadow-neumorphic-active'
                    )}
                  >
                    <cat.icon className="mr-2 h-5 w-5 text-current/80" />
                    {cat.name}
                  </TabsTrigger>
                ))}
              </TabsList>
            </Tabs>
            <div className="relative w-full max-w-xs">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder="Search products..."
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-xl border-none bg-background pl-10 text-base shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
              />
            </div>
        </div>

        <div className="relative grid grid-cols-1 gap-8 md:grid-cols-4">
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
    </div>
  );
}
