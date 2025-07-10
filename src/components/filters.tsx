'use client';

import { useMemo } from 'react';
import { Card, CardContent, CardHeader, CardTitle } from '@/components/ui/card';
import { Checkbox } from '@/components/ui/checkbox';
import { Label } from '@/components/ui/label';
import type { Product } from '@/lib/types';

interface FiltersProps {
  category: string;
  products: Product[];
  activeFilters: Record<string, string[]>;
  onFilterChange: (filterType: string, value: string) => void;
}

const getUniqueProperties = (products: Product[], property: string) => {
  const allValues = products.map((p) => p.properties[property]).filter(Boolean);
  return [...new Set(allValues)];
};

export function Filters({ category, products, activeFilters, onFilterChange }: FiltersProps) {
  
  const filterOptions = useMemo(() => {
    switch (category) {
      case 'Parfum':
        return {
          'Scent Profile': getUniqueProperties(products, 'Scent Profile'),
          'Concentration': getUniqueProperties(products, 'Concentration'),
        };
      case 'Raw Material':
        return {
          'Material Type': getUniqueProperties(products, 'Material Type'),
          'Origin': getUniqueProperties(products, 'Origin'),
        };
      case 'Tools':
        return {
          'Tool Type': getUniqueProperties(products, 'Tool Type'),
          'Material': getUniqueProperties(products, 'Material'),
        };
      default:
        return {};
    }
  }, [category, products]);

  return (
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground/80">Filters</CardTitle>
      </CardHeader>
      <CardContent className="space-y-6">
        {Object.entries(filterOptions).map(([title, options]) => (
          options.length > 0 && (
            <div key={title} className="space-y-3">
              <h3 className="font-semibold text-foreground/70">{title}</h3>
              <div className="space-y-2">
                {options.map((option) => (
                  <div key={option} className="flex items-center space-x-3">
                    <Checkbox
                      id={`${title}-${option}`}
                      checked={activeFilters[title]?.includes(option) ?? false}
                      onCheckedChange={() => onFilterChange(title, option)}
                      className="h-5 w-5 rounded-md border-muted-foreground/50 shadow-sm data-[state=checked]:bg-accent data-[state=checked]:text-accent-foreground"
                    />
                    <Label
                      htmlFor={`${title}-${option}`}
                      className="text-base text-muted-foreground"
                    >
                      {option}
                    </Label>
                  </div>
                ))}
              </div>
            </div>
          )
        ))}
         {Object.keys(filterOptions).length === 0 && category !== 'All' && (
            <p className="text-muted-foreground">No filters available for this category.</p>
        )}
      </CardContent>
    </Card>
  );
}
