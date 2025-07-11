// src/components/admin/feedback-card.tsx
'use client';

import { useSortable } from '@dnd-kit/sortable';
import { CSS } from '@dnd-kit/utilities';
import { Card, CardHeader, CardTitle, CardContent, CardDescription } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import type { FeedbackItem as FeedbackItemType } from '@/data/feedback';
import { MessageSquare, Bug } from 'lucide-react';
import { cn } from '@/lib/utils';

interface FeedbackCardProps {
  item: FeedbackItemType;
  isOverlay?: boolean;
}

export function FeedbackCard({ item, isOverlay }: FeedbackCardProps) {
  const {
    attributes,
    listeners,
    setNodeRef,
    transform,
    transition,
    isDragging,
  } = useSortable({ id: item.id, data: { type: 'item', item } });

  const style = {
    transition,
    transform: CSS.Transform.toString(transform),
  };
  
  const Icon = item.type === 'Saran' ? MessageSquare : Bug;

  return (
    <Card
      ref={setNodeRef}
      style={style}
      {...attributes}
      {...listeners}
      className={cn(
          "bg-card shadow-sm cursor-grab",
          isDragging && "opacity-50 z-50",
          isOverlay && "ring-2 ring-primary"
      )}
    >
      <CardHeader>
        <div className="flex justify-between items-start">
            <CardTitle className="text-base font-bold leading-tight pr-4">{item.subject}</CardTitle>
            <Badge variant={item.type === 'Saran' ? 'secondary' : 'destructive'}>
                <Icon className="mr-1.5 h-3 w-3" />
                {item.type}
            </Badge>
        </div>
        <CardDescription className="text-xs pt-1">
            From: {item.user} on {new Date(item.date).toLocaleDateString()}
        </CardDescription>
      </CardHeader>
      <CardContent>
        <p className="text-sm text-muted-foreground">{item.description}</p>
      </CardContent>
    </Card>
  );
}