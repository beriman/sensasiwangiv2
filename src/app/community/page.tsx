// src/app/community/page.tsx
'use client';

import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { Card, CardHeader, CardTitle, CardDescription, CardContent } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { forumCategories, getThreadsByCategory } from '@/data/forum';
import { MessageSquare, FlaskConical, ChevronRight } from 'lucide-react';

const categoryIcons: { [key: string]: React.ElementType } = {
  'perfumer-corner': FlaskConical,
  'ngobrolin-parfum': MessageSquare,
};

export default function CommunityPage() {
  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <div className="text-center mb-10">
          <h1 className="text-4xl font-bold text-foreground/90">Community Forum</h1>
          <p className="mt-2 text-lg text-muted-foreground">
            Connect, learn, and share your passion for scents.
          </p>
        </div>

        <div className="space-y-8">
          {forumCategories.map((category) => {
            const threads = getThreadsByCategory(category.id);
            const Icon = categoryIcons[category.id] || MessageSquare;
            return (
              <Card key={category.id} className="rounded-2xl border-none bg-transparent shadow-neumorphic">
                <CardHeader>
                  <div className="flex items-center gap-4">
                    <Icon className="h-8 w-8 text-accent" />
                    <div>
                      <CardTitle className="text-2xl font-bold text-foreground/80">{category.name}</CardTitle>
                      <CardDescription className="text-base">{category.description}</CardDescription>
                    </div>
                  </div>
                </CardHeader>
                <CardContent>
                  <div className="space-y-4">
                    {threads.slice(0, 3).map((thread) => (
                      <Link key={thread.id} href={`/community/thread/${thread.id}`} className="block">
                        <div className="flex items-center justify-between rounded-xl p-4 transition-colors hover:bg-secondary/50">
                          <div>
                            <p className="font-semibold text-foreground">{thread.title}</p>
                            <p className="text-sm text-muted-foreground">
                              by {thread.author} &middot; {thread.posts.length} replies
                            </p>
                          </div>
                          <ChevronRight className="h-5 w-5 text-muted-foreground" />
                        </div>
                      </Link>
                    ))}
                  </div>
                  {threads.length > 3 && (
                     <div className="mt-4 text-center">
                        <Button variant="outline" asChild className="rounded-xl">
                           <Link href="#">View all in {category.name}</Link>
                        </Button>
                     </div>
                  )}
                </CardContent>
              </Card>
            );
          })}
        </div>
      </main>
    </div>
  );
}
