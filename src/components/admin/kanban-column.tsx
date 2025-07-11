// src/components/admin/kanban-column.tsx
'use client';

import React from 'react';
import { useDroppable } from '@dnd-kit/core';
import { Card, CardHeader, CardTitle } from '@/components/ui/card';
import { Badge } from '@/components/ui/badge';
import { cn } from '@/lib/utils';
import type { FeedbackItem } from '@/data/feedback';

type Status = 'Baru' | 'Dalam Peninjauan' | 'Selesai';

interface KanbanColumnProps {
  status: Status;
  items: FeedbackItem[];
  children: React.ReactNode;
}

export function KanbanColumn({ status, items, children }: KanbanColumnProps) {
  const { setNodeRef, isOver } = useDroppable({
    id: status,
    data: {
        type: 'column',
        status: status
    }
  });

  return (
    <Card 
        ref={setNodeRef}
        className={cn(
            "rounded-xl border-none bg-muted/50 transition-colors",
            isOver && "bg-accent/20 ring-2 ring-accent"
        )}
    >
      <CardHeader>
        <CardTitle className="flex items-center justify-between">
          <span className="text-lg font-bold text-foreground/80">{status}</span>
          <Badge variant="secondary" className="text-base">
            {items.length}
          </Badge>
        </CardTitle>
      </CardHeader>
      <div className="space-y-4 p-4 pt-0 min-h-[200px]">
        {children}
      </div>
    </Card>
  );
}