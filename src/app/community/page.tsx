// src/app/community/page.tsx
'use client';

import { useState, useMemo } from 'react';
import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { allThreads, forumCategories, ForumCategory, Thread } from '@/data/forum';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { Input } from '@/components/ui/input';
import { Button } from '@/components/ui/button';
import { ArrowRight, MessageSquare, Search, X } from 'lucide-react';
import { cn } from '@/lib/utils';
import { Badge } from '@/components/ui/badge';

function CategoryCard({ category, threadCount }: { category: ForumCategory, threadCount: number }) {
  const recentThreads = allThreads.filter(t => t.categoryId === category.id).slice(0, 3);

  return (
    <Card className="flex flex-col rounded-2xl border-none bg-transparent shadow-neumorphic transition-all duration-300 ease-in-out hover:-translate-y-1 hover:shadow-lg">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground/80">{category.name}</CardTitle>
        <CardDescription>{category.description}</CardDescription>
      </CardHeader>
      <CardContent className="flex-grow">
        <h4 className="mb-2 font-semibold text-muted-foreground">Recent Threads</h4>
        <ul className="space-y-2">
          {recentThreads.map(thread => (
            <li key={thread.id}>
                <Link href={`/community/thread/${thread.id}`} className="flex items-center gap-2 text-sm text-foreground/90 hover:text-accent">
                    <MessageSquare className="h-4 w-4 shrink-0" />
                    <span className="truncate">{thread.title}</span>
                </Link>
            </li>
          ))}
           {threadCount === 0 && (
            <p className="text-sm text-muted-foreground">No threads yet.</p>
           )}
        </ul>
      </CardContent>
      <div className="flex items-center justify-end p-4">
        <Link href={`/community?category=${category.id}`} className="flex items-center text-sm font-semibold text-accent hover:underline">
            View All ({threadCount})
            <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}

function ThreadListItem({ thread }: { thread: Thread }) {
  const category = forumCategories.find(c => c.id === thread.categoryId);
  return (
    <Link href={`/community/thread/${thread.id}`} className="block rounded-xl p-4 shadow-neumorphic transition-all hover:shadow-neumorphic-active hover:bg-muted/30">
        <div className="flex flex-col sm:flex-row sm:items-center sm:justify-between">
            <h3 className="text-lg font-bold text-foreground/90 group-hover:text-accent">{thread.title}</h3>
            {category && <Badge variant="secondary">{category.name}</Badge>}
        </div>
        <p className="mt-1 text-sm text-muted-foreground">
            by {thread.author} &middot; {new Date(thread.createdAt).toLocaleDateString()}
        </p>
        <p className="mt-2 text-foreground/80 line-clamp-2">{thread.content}</p>
    </Link>
  );
}


export default function CommunityPage() {
  const [searchTerm, setSearchTerm] = useState('');
  const [selectedCategory, setSelectedCategory] = useState<string | null>(null);

  const filteredThreads = useMemo(() => {
    return allThreads.filter(thread => {
      const categoryMatch = selectedCategory ? thread.categoryId === selectedCategory : true;
      const searchMatch = searchTerm.trim() === '' ? true :
        thread.title.toLowerCase().includes(searchTerm.toLowerCase()) ||
        thread.content.toLowerCase().includes(searchTerm.toLowerCase());
      return categoryMatch && searchMatch;
    });
  }, [searchTerm, selectedCategory]);

  const handleCategoryFilter = (categoryId: string) => {
    setSelectedCategory(prev => prev === categoryId ? null : categoryId);
  }

  const showSearchResults = searchTerm.trim() !== '' || selectedCategory !== null;

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
