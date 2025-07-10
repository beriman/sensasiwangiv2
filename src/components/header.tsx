'use client';

import { Leaf, FlaskConical, Wrench, Search } from 'lucide-react';
import { Input } from '@/components/ui/input';
import { Tabs, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { cn } from '@/lib/utils';

interface AppHeaderProps {
  category: string;
  setCategory: (category: string) => void;
  searchTerm: string;
  setSearchTerm: (term: string) => void;
}

const categories = [
  { name: 'Parfum', icon: Leaf },
  { name: 'Raw Material', icon: FlaskConical },
  { name: 'Tools', icon: Wrench },
];

export function AppHeader({
  category,
  setCategory,
  searchTerm,
  setSearchTerm,
}: AppHeaderProps) {
  return (
    <header className="sticky top-0 z-10 w-full border-b border-border/60 bg-background/80 shadow-neumorphic backdrop-blur-sm">
      <div className="container mx-auto flex h-20 items-center justify-between px-4">
        <h1 className="text-2xl font-bold tracking-tight text-foreground/80">
          sensasiwangi.id
        </h1>
        <div className="flex flex-1 items-center justify-center">
          <Tabs value={category} onValueChange={setCategory} className="w-auto">
            <TabsList className="h-12 rounded-xl bg-transparent p-1 shadow-neumorphic-inset">
              {categories.map((cat) => (
                <TabsTrigger
                  key={cat.name}
                  value={cat.name}
                  className={cn(
                    'h-full rounded-lg px-4 py-2 text-foreground/70 transition-all duration-300 data-[state=active]:shadow-neumorphic-active data-[state=active]:text-accent-foreground data-[state=active]:bg-accent/50',
                    'hover:bg-background/50 hover:shadow-neumorphic-active'
                  )}
                >
                  <cat.icon className="mr-2 h-5 w-5 text-accent-foreground/80" />
                  {cat.name}
                </TabsTrigger>
              ))}
            </TabsList>
          </Tabs>
        </div>
        <div className="relative w-full max-w-xs">
          <Search className="absolute left-3 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
          <Input
            type="search"
            placeholder="Search products..."
            value={searchTerm}
            onChange={(e) => setSearchTerm(e.target.value)}
            className="h-12 rounded-xl border-none bg-background pl-10 text-base shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
          />
        </div>
      </div>
    </header>
  );
}
