// src/app/community/page.tsx
'use client';

import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { forumCategories, getThreadsByCategory, ForumCategory } from '@/data/forum';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { ArrowRight, MessageSquare } from 'lucide-react';

function CategoryCard({ category }: { category: ForumCategory }) {
  const recentThreads = getThreadsByCategory(category.id).slice(0, 3);
  const totalThreads = getThreadsByCategory(category.id).length;

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
           {totalThreads === 0 && (
            <p className="text-sm text-muted-foreground">No threads yet.</p>
           )}
        </ul>
      </CardContent>
      <div className="flex items-center justify-end p-4">
        <Link href="#" className="flex items-center text-sm font-semibold text-accent hover:underline">
            View All ({totalThreads})
            <ArrowRight className="ml-1 h-4 w-4" />
        </Link>
      </div>
    </Card>
  );
}


export default function CommunityPage() {
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

        <div className="grid grid-cols-1 gap-8 md:grid-cols-2">
          {forumCategories.map((category) => (
            <CategoryCard key={category.id} category={category} />
          ))}
        </div>
      </main>
    </div>
  );
}
