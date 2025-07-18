// src/app/nusantarum/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { AppHeader } from '@/components/header';
import { products } from '@/data/products';
import { profiles } from '@/data/profiles';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Users, Bot, Building, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';

import { PerfumersTabContent } from '@/components/nusantarum/perfumers-tab-content';
import { BrandsTabContent } from '@/components/nusantarum/brands-tab-content';
import { ParfumsTabContent } from '@/components/nusantarum/parfums-tab-content';

const allParfums = products.filter(p => p.category === 'Parfum');
const allPerfumers = profiles.filter(p => p.type === 'Perfumer');
const allBrands = profiles.filter(p => p.type === 'Brand');

export default function NusantarumPage() {
  const [searchTerm, setSearchTerm] = useState('');

  const filteredPerfumers = useMemo(() => {
    if (!searchTerm) return allPerfumers;
    const lowercasedTerm = searchTerm.toLowerCase();
    return allPerfumers.filter(p => 
      p.name.toLowerCase().includes(lowercasedTerm) ||
      p.username.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  const filteredBrands = useMemo(() => {
    if (!searchTerm) return allBrands;
    const lowercasedTerm = searchTerm.toLowerCase();
    return allBrands.filter(b => 
      b.name.toLowerCase().includes(lowercasedTerm) ||
      b.username.toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  const filteredParfums = useMemo(() => {
    if (!searchTerm) return allParfums;
    const lowercasedTerm = searchTerm.toLowerCase();
    return allParfums.filter(p => 
      p.name.toLowerCase().includes(lowercasedTerm) ||
      (p.properties.Brand || '').toLowerCase().includes(lowercasedTerm) ||
      (p.properties['Scent Profile'] || '').toLowerCase().includes(lowercasedTerm)
    );
  }, [searchTerm]);

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Nusantarum</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            The Encyclopedia of Scents. Discover perfumers, brands, and perfumes in our database.
          </p>
        </div>

        <div className="mb-8 mx-auto max-w-lg">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search for perfumers, brands, or perfumes..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 w-full rounded-xl border-none bg-background pl-12 text-base shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
                />
            </div>
        </div>

        <Tabs defaultValue="perfumers" className="w-full">
          <TabsList className="mx-auto grid w-full max-w-md grid-cols-3 rounded-xl bg-transparent p-1 shadow-neumorphic-inset">
            <TabsTrigger value="perfumers" className="h-full rounded-lg text-foreground/70 transition-all duration-300 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
                <Users className="mr-2 h-5 w-5" />
                Perfumers
            </TabsTrigger>
            <TabsTrigger value="brands" className="h-full rounded-lg text-foreground/70 transition-all duration-300 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
                <Building className="mr-2 h-5 w-5" />
                Brands
            </TabsTrigger>
            <TabsTrigger value="parfums" className="h-full rounded-lg text-foreground/70 transition-all duration-300 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
                <Bot className="mr-2 h-5 w-5" />
                Parfums
            </TabsTrigger>
          </TabsList>
          
          <TabsContent value="perfumers" className="mt-8">
            <PerfumersTabContent perfumers={filteredPerfumers} />
          </TabsContent>
          
          <TabsContent value="brands" className="mt-8">
             <BrandsTabContent brands={filteredBrands} />
          </TabsContent>

          <TabsContent value="parfums" className="mt-8">
            <ParfumsTabContent parfums={filteredParfums} />
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}