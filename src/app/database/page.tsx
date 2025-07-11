
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { useRouter } from 'next/navigation';
import { AppHeader } from '@/components/header';
import { products as allProducts } from '@/data/products';
import { perfumers as allPerfumers } from '@/data/perfumers';
import { Tabs, TabsList, TabsTrigger, TabsContent } from '@/components/ui/tabs';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Badge } from '@/components/ui/badge';
import { Search, User, Droplet, Store } from 'lucide-react';

export default function DatabasePage() {
  const router = useRouter();
  const [activeTab, setActiveTab] = useState('parfums');
  const [searchTerm, setSearchTerm] = useState('');

  const parfums = useMemo(() => {
    const allParfums = allProducts.filter(p => p.category === 'Parfum');
    if (!searchTerm) return allParfums;
    return allParfums.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.properties.Brand?.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.properties.Perfumer?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);

  const brands = useMemo(() => {
    const brandNames = [...new Set(allProducts.map(p => p.properties.Brand).filter(Boolean))];
    if (!searchTerm) return brandNames;
    return brandNames.filter(b => b.toLowerCase().includes(searchTerm.toLowerCase()));
  }, [searchTerm]);

  const perfumers = useMemo(() => {
    // Combine perfumers from products and the perfumers list
    const productPerfumers = allProducts.map(p => p.properties.Perfumer).filter(Boolean);
    const profilePerfumers = allPerfumers.map(p => p.name);
    const allPerfumerNames = [...new Set([...productPerfumers, ...profilePerfumers])];

    const perfumerData = allPerfumerNames.map(name => {
      const profile = allPerfumers.find(p => p.name === name);
      const creations = allProducts.filter(p => p.properties.Perfumer === name).length;
      return {
        name,
        slug: profile?.slug,
        username: profile?.username,
        creations,
      };
    });

    if (!searchTerm) return perfumerData;
    return perfumerData.filter(p =>
      p.name.toLowerCase().includes(searchTerm.toLowerCase()) ||
      p.username?.toLowerCase().includes(searchTerm.toLowerCase())
    );
  }, [searchTerm]);
  
  const handleBrandClick = (brandName: string) => {
    router.push(`/?brand=${encodeURIComponent(brandName)}`);
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-8">
          <h1 className="text-4xl font-bold text-foreground/90">Database</h1>
          <p className="mt-2 text-lg text-muted-foreground">Explore all brands, perfumes, and perfumers in our ecosystem.</p>
        </div>

        <Tabs value={activeTab} onValueChange={setActiveTab} className="w-full">
          <div className="flex flex-col md:flex-row justify-between items-center mb-6 gap-4">
            <TabsList className="h-12 w-full rounded-xl bg-transparent p-1 shadow-neumorphic-inset md:w-auto">
              <TabsTrigger value="parfums" className="h-full flex-1 rounded-lg px-4 py-2 text-foreground/70 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
                <Droplet className="mr-2 h-5 w-5" /> Varian Parfum
              </TabsTrigger>
              <TabsTrigger value="brands" className="h-full flex-1 rounded-lg px-4 py-2 text-foreground/70 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
                <Store className="mr-2 h-5 w-5" /> Merek
              </TabsTrigger>
              <TabsTrigger value="perfumers" className="h-full flex-1 rounded-lg px-4 py-2 text-foreground/70 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
                <User className="mr-2 h-5 w-5" /> Perfumer
              </TabsTrigger>
            </TabsList>
            <div className="relative w-full max-w-sm">
              <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
              <Input
                type="search"
                placeholder={`Search in ${activeTab}...`}
                value={searchTerm}
                onChange={(e) => setSearchTerm(e.target.value)}
                className="h-12 w-full rounded-xl border-none bg-background pl-10 text-base shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
              />
            </div>
          </div>

          <TabsContent value="parfums">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {parfums.map(parfum => (
                <Link key={parfum.id} href={`/products/${parfum.id}`} className="block h-full">
                  <Card className="group flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
                    <CardHeader>
                      <CardTitle className="text-lg font-bold text-foreground/90">{parfum.name}</CardTitle>
                      <CardDescription className="text-sm text-muted-foreground">{parfum.properties.Brand}</CardDescription>
                    </CardHeader>
                    <CardContent>
                      <p className="text-sm text-foreground/80 line-clamp-2">{parfum.description}</p>
                    </CardContent>
                  </Card>
                </Link>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="brands">
            <div className="grid grid-cols-2 gap-6 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5">
              {brands.map(brand => (
                <Card
                  key={brand}
                  onClick={() => handleBrandClick(brand)}
                  className="group flex h-full cursor-pointer transform-gpu flex-col justify-center overflow-hidden rounded-2xl border-none bg-transparent p-6 text-center shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <CardTitle className="text-md font-bold text-foreground/90">{brand}</CardTitle>
                </Card>
              ))}
            </div>
          </TabsContent>
          <TabsContent value="perfumers">
            <div className="grid grid-cols-1 gap-6 sm:grid-cols-2 lg:grid-cols-3 xl:grid-cols-4">
              {perfumers.map(perfumer => (
                <Card
                  key={perfumer.name}
                  className="group flex h-full transform-gpu flex-col overflow-hidden rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg"
                >
                  <Link href={perfumer.slug ? `/profile/${perfumer.slug}` : '#'} className={`block h-full p-6 ${!perfumer.slug && 'cursor-default'}`}>
                    <CardTitle className="text-lg font-bold text-foreground/90">{perfumer.name}</CardTitle>
                    {perfumer.username && <CardDescription className="text-sm text-muted-foreground">{perfumer.username}</CardDescription>}
                    <div className="mt-4">
                      <Badge variant="secondary">{perfumer.creations} creations</Badge>
                    </div>
                  </Link>
                </Card>
              ))}
            </div>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
