// src/app/community/page.tsx
'use client';

import { useMemo } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { allThreads, forumCategories } from '@/data/forum';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';

import { CategoryCard } from '@/components/community/category-card';
import { ThreadListItem } from '@/components/community/thread-list-item';
import { useForumFilters } from '@/hooks/use-forum-filters';

export default function CommunityPage() {
  const { searchTerm, setSearchTerm, selectedCategory, handleCategoryFilter, filteredThreads, showSearchResults } = useForumFilters();

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="mb-8 text-center">
          <h1 className="text-4xl font-bold text-foreground/90">Community Forum</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Connect, discuss, and share with fellow scent enthusiasts.
          </p>
        </div>
        
        <div className="mx-auto mb-8 max-w-2xl space-y-4">
            <div className="relative">
                <Search className="absolute left-4 top-1/2 -translate-y-1/2 h-5 w-5 text-muted-foreground" />
                <Input
                    type="search"
                    placeholder="Search for discussions..."
                    value={searchTerm}
                    onChange={(e) => setSearchTerm(e.target.value)}
                    className="h-12 w-full rounded-xl border-none bg-background pl-12 text-base shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
                />
            </div>
            <div className="flex flex-wrap justify-center gap-2">
                {forumCategories.map(category => (
                    <Button
                        key={category.id}
                        variant={selectedCategory === category.id ? 'default' : 'outline'}
                        onClick={() => handleCategoryFilter(category.id)}
                        className={cn("rounded-full transition-all", selectedCategory === category.id && "bg-accent-gradient text-accent-foreground")}
                    >
                        {category.name}
                        {selectedCategory === category.id && <X className="ml-2 h-4 w-4" />}
                    </Button>
                ))}
            </div>
        </div>

        {showSearchResults ? (
          <div className="space-y-6">
            <h2 className="text-2xl font-bold text-foreground/80">
                Results ({filteredThreads.length})
            </h2>
            {filteredThreads.length > 0 ? (
                filteredThreads.map(thread => <ThreadListItem key={thread.id} thread={thread} />)
            ) : (
                <div className="py-16 text-center text-muted-foreground">
                    <p className="text-lg">No discussions found.</p>
                    <p>Try a different search term or clear your filters.</p>
                </div>
            )}
          </div>
        ) : (
          <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
            {forumCategories.map((category) => {
              const threadCount = allThreads.filter(t => t.categoryId === category.id).length;
              return <CategoryCard key={category.id} category={category} threadCount={threadCount} />;
            })}
          </div>
        )}
      </main>
    </div>
  );
}