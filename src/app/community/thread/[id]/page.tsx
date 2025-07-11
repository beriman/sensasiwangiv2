// src/app/community/thread/[id]/page.tsx
'use client';

import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import { AppHeader } from '@/components/header';
import { getThreadById } from '@/data/forum';
import { perfumers } from '@/data/perfumers';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { Button } from '@/components/ui/button';
import { Textarea } from '@/components/ui/textarea';
import { ArrowLeft } from 'lucide-react';
import Link from 'next/link';
import { ContentRenderer } from '@/components/content-renderer';

export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const threadId = Array.isArray(params.id) ? params.id[0] : params.id;
  const thread = getThreadById(threadId);

  if (!thread) {
    notFound();
  }

  const getAuthorProfilePic = (authorName: string) => {
    const perfumer = perfumers.find(p => p.name === authorName);
    return perfumer?.profilePicture || 'https://placehold.co/40x40.png';
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Forum
        </Button>
        <div className="mb-6">
          <h1 className="text-3xl font-bold text-foreground/90">{thread.title}</h1>
          <p className="text-muted-foreground mt-1">A discussion started by {thread.author}</p>
        </div>

        <div className="space-y-6">
          {/* Original Post */}
          <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
            <CardHeader className="flex flex-row items-start gap-4">
               <Image src={getAuthorProfilePic(thread.author)} alt={thread.author} width={40} height={40} className="rounded-full" />
              <div>
                <CardTitle className="text-base font-bold text-foreground/80">{thread.author}</CardTitle>
                <CardDescription className="text-sm">Original Poster</CardDescription>
              </div>
            </CardHeader>
            <CardContent>
              <ContentRenderer content={thread.content} />
            </CardContent>
          </Card>

          <Separator />

          {/* Replies */}
          <h2 className="text-2xl font-bold text-foreground/80">Replies ({thread.posts.length})</h2>
          {thread.posts.map((post, index) => (
            <Card key={index} className="rounded-2xl border-none bg-transparent shadow-neumorphic">
              <CardHeader className="flex flex-row items-start gap-4">
                <Image src={getAuthorProfilePic(post.author)} alt={post.author} width={40} height={40} className="rounded-full" />
                <div>
                  <CardTitle className="text-base font-bold text-foreground/80">{post.author}</CardTitle>
                </CardHeader>
              </CardHeader>
              <CardContent>
                <ContentRenderer content={post.content} />
              </CardContent>
            </Card>
          ))}

            {/* Reply Form */}
            <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
                <CardHeader>
                    <CardTitle className="text-xl font-bold text-foreground/80">Join the discussion</CardTitle>
                </CardHeader>
                <CardContent>
                    <form className="space-y-4">
                        <Textarea
                            placeholder="Write your reply here... You can paste links from YouTube, TikTok, or Instagram."
                            className="min-h-[120px] rounded-xl border-none bg-background text-base shadow-neumorphic-inset focus:ring-2 focus:ring-ring"
                        />
                        <Button className="rounded-xl bg-accent-gradient px-8 py-6 text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                            Post Reply
                        </Button>
                    </form>
                </CardContent>
            </Card>
        </div>
      </main>
    </div>
  );
}
