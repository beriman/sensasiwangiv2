// src/app/community/thread/[id]/page.tsx
'use client';

import { notFound, useParams, useRouter } from 'next/navigation';
import Image from 'next/image';
import Link from 'next/link';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Separator } from '@/components/ui/separator';
import { ContentRenderer } from '@/components/content-renderer';
import { ArrowLeft, Star } from 'lucide-react'; // Removed unused icons
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { useToast } from '@/hooks/use-toast';

import { profiles } from '@/data/profiles'; // Still using mock data for profiles

import { useThreadDetails } from '@/hooks/use-thread-details';
import { ThreadPostItem } from '@/components/community/thread-post-item';
import { ReplyBox } from '@/components/community/reply-box';

// Helper to get profile pic, can be expanded later
const getAuthorProfilePic = (authorName: string) => {
    const perfumer = profiles.find(p => p.name === authorName);
    return perfumer?.profilePicture || 'https://placehold.co/48x48.png';
}

const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: id });
}

export default function ThreadPage() {
  const router = useRouter();
  const { toast } = useToast();
  const params = useParams();
  const threadId = Array.isArray(params.id) ? params.id[0] : params.id || '';
  
  const { thread, posts, loading, error, handleVote, handleModeratorDeletePost, handleModeratorWarnUser } = useThreadDetails(threadId);

  // For simulation, we assume the logged-in user is 'Alex Doe', who is a moderator.
  const MOCK_CURRENT_USER_NAME = 'Alex Doe';
  const MOCK_IS_MODERATOR = MOCK_CURRENT_USER_NAME === 'Alex Doe';

  if (loading) {
    return <div className="min-h-screen flex items-center justify-center">Loading thread...</div>;
  }

  if (error) {
    return <div className="min-h-screen flex items-center justify-center text-destructive">Error: {error}</div>;
  }

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
          {posts.map((post, index) => {
            const originalIndex = thread.posts.findIndex(p => p.content === post.content && p.author === post.author);
            return (
              <ThreadPostItem
                key={index}
                post={post}
                originalIndex={originalIndex}
                MOCK_IS_MODERATOR={MOCK_IS_MODERATOR}
                MOCK_CURRENT_USER_NAME={MOCK_CURRENT_USER_NAME}
                handleVote={handleVote}
                handleModeratorDeletePost={handleModeratorDeletePost}
                handleModeratorWarnUser={handleModeratorWarnUser}
              />
            );
          })}
        </div>

        <ReplyBox />

      </main>
    </div>
  );
}