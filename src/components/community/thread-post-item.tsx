import Image from 'next/image';
import Link from 'next/link';
import { ArrowUp, ArrowDown, Gavel, Trash2, ShieldAlert } from 'lucide-react';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Button } from '@/components/ui/button';
import { DropdownMenu, DropdownMenuContent, DropdownMenuItem, DropdownMenuLabel, DropdownMenuTrigger } from '@/components/ui/dropdown-menu';
import { ContentRenderer } from '@/components/content-renderer';
import { formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import { cn } from '@/lib/utils';
import { profiles } from '@/data/profiles';

// Helper to get profile pic, can be expanded later
const getAuthorProfilePic = (authorName: string) => {
    const perfumer = profiles.find(p => p.name === authorName);
    return perfumer?.profilePicture || 'https://placehold.co/48x48.png';
}

const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: id });
}

interface ThreadPostItemProps {
  post: any; // Consider defining a more specific type for Post
  originalIndex: number;
  MOCK_IS_MODERATOR: boolean;
  MOCK_CURRENT_USER_NAME: string;
  handleVote: (postIndex: number, voteType: 'up' | 'down') => void;
  handleModeratorDeletePost: (postIndex: number) => void;
  handleModeratorWarnUser: (authorName: string) => void;
}

export function ThreadPostItem({
  post,
  originalIndex,
  MOCK_IS_MODERATOR,
  MOCK_CURRENT_USER_NAME,
  handleVote,
  handleModeratorDeletePost,
  handleModeratorWarnUser,
}: ThreadPostItemProps) {
  return (
    <Card className="flex gap-4 rounded-2xl border-none bg-transparent p-4 shadow-neumorphic">
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
          <div className="flex items-center gap-2">
            {MOCK_IS_MODERATOR && post.author !== MOCK_CURRENT_USER_NAME && (
              <DropdownMenu>
                <DropdownMenuTrigger asChild>
                  <Button variant="ghost" size="icon" className="h-8 w-8">
                    <Gavel className="h-5 w-5 text-muted-foreground" />
                  </Button>
                </DropdownMenuTrigger>
                <DropdownMenuContent align="end">
                  <DropdownMenuLabel>Aksi Moderasi</DropdownMenuLabel>
                  <DropdownMenuItem className="text-destructive focus:bg-destructive/10 focus:text-destructive" onClick={() => handleModeratorDeletePost(originalIndex)}>
                    <Trash2 className="mr-2 h-4 w-4" />
                    Hapus Postingan
                  </DropdownMenuItem>
                  <DropdownMenuItem className="text-orange-600 focus:bg-orange-100 focus:text-orange-700" onClick={() => handleModeratorWarnUser(post.author)}>
                    <ShieldAlert className="mr-2 h-4 w-4" />
                    Kirim Peringatan
                  </DropdownMenuItem>
                </DropdownMenuContent>
              </DropdownMenu>
            )}
            <p className="text-xs text-muted-foreground">{formatTimestamp(post.timestamp)}</p>
          </div>
        </CardHeader>
        <CardContent className="p-0 pt-4">
          <ContentRenderer content={post.content} />
        </CardContent>
      </div>
    </Card>
  );
}
