import Link from 'next/link';
import { Card, CardContent, CardDescription, CardHeader, CardTitle } from '@/components/ui/card';
import { MessageSquare, ArrowRight } from 'lucide-react';
import { allThreads, ForumCategory } from '@/data/forum';

interface CategoryCardProps {
  category: ForumCategory;
  threadCount: number;
}

export function CategoryCard({ category, threadCount }: CategoryCardProps) {
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
