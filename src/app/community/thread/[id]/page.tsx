// src/app/community/thread/[id]/page.tsx
'use client';

import { useState, useMemo } from 'react';
import { useParams, notFound, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { getThreadById, Post } from '@/data/forum';
import { profiles } from '@/data/profiles';
import { ArrowLeft, ArrowUp, ArrowDown } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContentRenderer } from '@/components/content-renderer';
import { Textarea } from '@/components/ui/textarea';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';

// Helper to get profile pic, can be expanded later
const getAuthorProfilePic = (authorName: string) => {
    const perfumer = profiles.find(p => p.name === authorName);
    return perfumer?.profilePicture || 'https://placehold.co/48x48.png';
}

const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: id });
}


export default function ThreadPage() {
  const params = useParams();
  const router = useRouter();
  const threadId = Array.isArray(params.id) ? params.id[0] : params.id;
  const thread = getThreadById(threadId);

  const [posts, setPosts] = useState<Post[]>(thread?.posts || []);

  const handleVote = (postIndex: number, voteType: 'up' | 'down') => {
    setPosts(currentPosts => {
        const newPosts = [...currentPosts];
        const post = newPosts[postIndex];
        if (voteType === 'up') {
            post.votes += 1;
        } else {
            post.votes -= 1;
        }
        return newPosts;
    });
  };

  const sortedPosts = useMemo(() => {
    return [...posts].sort((a, b) => b.votes - a.votes);
  }, [posts]);


  if (!thread) {
    notFound();
  }

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto max-w-4xl px-4 py-8">
        <Button variant="ghost" onClick={() => router.back()} className="mb-6">
            <ArrowLeft className="mr-2 h-4 w-4" />
            Back to Community
        </Button>
        
        {/* Original Post */}
        <div className="mb-8">
            <h1 className="text-3xl font-bold text-foreground/90">{thread.title}</h1>
            <p className="mt-2 text-sm text-muted-foreground">
                Started by <Link href="#" className="font-semibold text-accent hover:underline">{thread.author}</Link> &middot; {formatTimestamp(thread.createdAt)}
            </p>
        </div>

        <Card className="mb-8 rounded-2xl border-none bg-transparent shadow-neumorphic">
            <CardHeader className="flex flex-row items-center gap-4 p-4">
                <Image
                    src={getAuthorProfilePic(thread.author)}
                    alt={thread.author}
                    width={48}
                    height={48}
                    className="rounded-full"
                />
                <div className="flex-grow">
                    <p className="font-bold text-foreground/80">{thread.author}</p>
                    <p className="text-xs text-muted-foreground">Original Poster</p>
                </div>
                <p className="text-xs text-muted-foreground">{formatTimestamp(thread.createdAt)}</p>
            </CardHeader>
            <CardContent className="px-4 pb-6">
                <ContentRenderer content={thread.content} />
            </CardContent>
        </Card>
        
        <Separator className="my-8" />

        {/* Replies */}
        <h2 className="mb-4 text-2xl font-bold text-foreground/80">Replies ({thread.posts.length})</h2>
        <div className="space-y-6">
          {sortedPosts.map((post, index) => {
            const originalIndex = posts.findIndex(p => p.content === post.content && p.author === post.author);
            return (
            <Card key={index} className="flex gap-4 rounded-2xl border-none bg-transparent p-4 shadow-neumorphic">
                <div className="flex flex-col items-center space-y-1">
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleVote(originalIndex, 'up')}>
                        <ArrowUp className="h-5 w-5" />
                    </Button>
                    <span className={cn("text-lg font-bold", post.votes > 0 ? "text-green-600" : post.votes < 0 ? "text-red-600" : "text-muted-foreground")}>
                        {post.votes}
                    </span>
                    <Button variant="ghost" size="icon" className="h-8 w-8 rounded-full" onClick={() => handleVote(originalIndex, 'down')}>
                        <ArrowDown className="h-5 w-5" />
                    </Button>
                </div>
                <div className="flex-1">
                    <CardHeader className="flex flex-row items-center gap-4 p-0">
                        <Image
                            src={getAuthorProfilePic(post.author)}
                            alt={post.author}
                            width={40}
                            height={40}
                            className="rounded-full"
                        />
                        <div className="flex-grow">
                        <p className="font-bold text-foreground/80">{post.author}</p>
                        </div>
                        <p className="text-xs text-muted-foreground">{formatTimestamp(post.timestamp)}</p>
                    </CardHeader>
                    <CardContent className="p-0 pt-4">
                        <ContentRenderer content={post.content} />
                    </CardContent>
                </div>
            </Card>
            )
          })}
        </div>

        {/* Reply Box */}
        <div className="mt-10">
            <h3 className="mb-4 text-xl font-bold text-foreground/80">Join the Discussion</h3>
            <Textarea 
                placeholder="Write your reply here..."
                className="min-h-[150px] rounded-xl border-none bg-background shadow-neumorphic-inset"
            />
            <Button className="mt-4 h-12 rounded-xl bg-accent-gradient px-6 text-lg font-bold text-accent-foreground shadow-neumorphic">
                Post Reply
            </Button>
        </div>

      </main>
    </div>
  );
}
