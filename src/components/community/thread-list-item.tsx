import Link from 'next/link';
import { Badge } from '@/components/ui/badge';
import { forumCategories, Thread } from '@/data/forum';

interface ThreadListItemProps {
  thread: Thread;
}

export function ThreadListItem({ thread }: ThreadListItemProps) {
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
