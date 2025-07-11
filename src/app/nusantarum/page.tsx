
// src/app/nusantarum/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { products } from '@/data/products';
import { profiles, Profile } from '@/data/profiles';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { ArrowRight, Users, Bot, Building, BadgeCheck, Search } from 'lucide-react';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Input } from '@/components/ui/input';

const allParfums = products.filter(p => p.category === 'Parfum');
const allPerfumers = profiles.filter(p => p.type === 'Perfumer');
const allBrands = profiles.filter(p => p.type === 'Brand');

function PerfumerCard({ perfumer }: { perfumer: Profile }) {
  return (
    <Card className="flex flex-col rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <CardHeader className="flex flex-row items-center gap-4">
        <Avatar className="h-16 w-16">
          <AvatarImage src={perfumer.profilePicture} alt={perfumer.name} data-ai-hint={perfumer.imageHint}/>
          <AvatarFallback>{perfumer.name.charAt(0)}</AvatarFallback>
        </Avatar>
        <div>
          <CardTitle className="text-xl font-bold text-foreground/80">{perfumer.name}</CardTitle>
          <CardDescription>{perfumer.username}</CardDescription>
        </div>
      </CardHeader>
      <CardContent className="flex-grow">
        <p className="text-muted-foreground line-clamp-3">{perfumer.bio}</p>
      </CardContent>
      <div className="flex items-center justify-between p-4">
        <div className="text-sm text-muted-foreground">
            {perfumer.followers ? 
              `${perfumer.followers.toLocaleString()} Followers` :
              perfumer.curation?.isCurated ? (
                 <div className="flex items-center gap-1.5 text-xs font-semibold text-blue-800">
                    <BadgeCheck className="h-4 w-4" />
                    Terverifikasi
                </div>
              ) : ''
            }
        </div>
        <Link href={`/profile/${perfumer.slug}`} className="flex items-center text-sm font-semibold text-accent hover:underline">
          View Profile
          <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

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
            <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredPerfumers.map(perfumer => (
                <PerfumerCard key={perfumer.slug} perfumer={perfumer} />
              ))}
            </div>
             {filteredPerfumers.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">No perfumers found.</div>
             )}
          </TabsContent>
          
          <TabsContent value="brands" className="mt-8">
             <div className="grid grid-cols-1 gap-6 md:grid-cols-2 lg:grid-cols-3">
              {filteredBrands.map(brand => (
                <PerfumerCard key={brand.slug} perfumer={brand} />
              ))}
            </div>
             {filteredBrands.length === 0 && (
                <div className="text-center py-12 text-muted-foreground">No brands found.</div>
             )}
          </TabsContent>

          <TabsContent value="parfums" className="mt-8">
            <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground/80">All Parfums</CardTitle>
                    <CardDescription>A complete list of all perfumes in our database.</CardDescription>
                </CardHeader>
                <CardContent>
                    <Table>
                        <TableHeader>
                            <TableRow>
                            <TableHead>Perfume</TableHead>
                            <TableHead>Brand</TableHead>
                            <TableHead>Scent Profile</TableHead>
                            </TableRow>
                        </TableHeader>
                        <TableBody>
                            {filteredParfums.map(parfum => (
                            <TableRow key={parfum.id}>
                                <TableCell className="font-medium">
                                    <Link href={`/products/${parfum.id}`} className="hover:text-accent hover:underline">
                                        {parfum.name}
                                    </Link>
                                </TableCell>
                                <TableCell>{parfum.properties.Brand}</TableCell>
                                <TableCell>
                                    <Badge variant="secondary">{parfum.properties['Scent Profile']}</Badge>
                                </TableCell>
                            </TableRow>
                            ))}
                        </TableBody>
                    </Table>
                    {filteredParfums.length === 0 && (
                        <div className="text-center py-12 text-muted-foreground">No parfums found.</div>
                    )}
                </CardContent>
            </Card>
          </TabsContent>
        </Tabs>
      </main>
    </div>
  );
}
