import { useState, useEffect, useMemo, useCallback } from 'react';
import { getThreadById, Post, Thread } from '@/data/forum';
import { useToast } from '@/hooks/use-toast';

interface UseThreadDetailsResult {
  thread: Thread | null;
  posts: Post[];
  loading: boolean;
  error: string | null;
  handleVote: (postIndex: number, voteType: 'up' | 'down') => void;
  handleModeratorDeletePost: (postIndex: number) => void;
  handleModeratorWarnUser: (authorName: string) => void;
}

export const useThreadDetails = (threadId: string): UseThreadDetailsResult => {
  const { toast } = useToast();
  const [threadData, setThreadData] = useState<Thread | undefined | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  // MOCK_CURRENT_USER_NAME and MOCK_IS_MODERATOR would come from an auth context in a real app
  const MOCK_CURRENT_USER_NAME = 'Alex Doe';
  const MOCK_IS_MODERATOR = MOCK_CURRENT_USER_NAME === 'Alex Doe';

  useEffect(() => {
    setLoading(true);
    setError(null);
    const fetchedThread = getThreadById(threadId);
    if (fetchedThread) {
      setThreadData(fetchedThread);
    } else {
      setError('Thread not found.');
    }
    setLoading(false);
  }, [threadId]);

  const handleVote = useCallback((postIndex: number, voteType: 'up' | 'down') => {
    if (!threadData) return;

    setThreadData((currentThread: Thread | undefined | null) => {
      if (!currentThread) return null;
      const newPosts = [...currentThread.posts];
      const post = newPosts[postIndex];
      if (voteType === 'up') {
        post.votes += 1;
      } else {
        post.votes -= 1;
      }
      return { ...currentThread, posts: newPosts };
    });
  }, [threadData]);

  const handleModeratorDeletePost = useCallback((postIndex: number) => {
    if (!threadData) return;

    const postAuthor = threadData.posts[postIndex].author;
    setThreadData((currentThread: Thread | undefined | null) => {
      if (!currentThread) return null;
      const newPosts = currentThread.posts.filter((_, index) => index !== postIndex);
      return { ...currentThread, posts: newPosts };
    });
    toast({
      title: "Postingan Dihapus",
      description: `Postingan oleh ${postAuthor} telah dihapus.`,
    });
  }, [threadData, toast]);

  const handleModeratorWarnUser = useCallback((authorName: string) => {
    toast({
      variant: "destructive",
      title: "Peringatan Terkirim",
      description: `Peringatan resmi telah dikirim kepada pengguna ${authorName}.`,
    });
  }, [toast]);

  const sortedPosts = useMemo(() => {
    if (!threadData) return [];
    return [...threadData.posts].sort((a, b) => b.votes - a.votes);
  }, [threadData]);

  return {
    thread: threadData,
    posts: sortedPosts,
    loading,
    error,
    handleVote,
    handleModeratorDeletePost,
    handleModeratorWarnUser,
  };
};
