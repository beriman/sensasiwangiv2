// src/app/admin/feedback/page.tsx
'use client';

import { useState } from 'react';
import {
  DndContext,
  closestCenter,
  PointerSensor,
  useSensor,
  useSensors,
  DragEndEvent,
  DragOverlay,
  DragStartEvent,
} from '@dnd-kit/core';
import {
  SortableContext,
  verticalListSortingStrategy,
  arrayMove,
} from '@dnd-kit/sortable';

import { feedbackData as initialFeedback, FeedbackItem } from '@/data/feedback';
import { KanbanColumn } from '@/components/admin/kanban-column';
import { FeedbackCard } from '@/components/admin/feedback-card';

type Status = 'Baru' | 'Dalam Peninjauan' | 'Selesai';

export default function AdminFeedbackPage() {
  const [feedbackItems, setFeedbackItems] = useState<FeedbackItem[]>(initialFeedback);
  const [activeItem, setActiveItem] = useState<FeedbackItem | null>(null);

  const sensors = useSensors(
    useSensor(PointerSensor, {
      activationConstraint: {
        distance: 8,
      },
    })
  );

  const columns: Status[] = ['Baru', 'Dalam Peninjauan', 'Selesai'];

  const getItemsByStatus = (status: Status) => {
    return feedbackItems
      .filter((item) => item.status === status)
      .sort((a, b) => a.id - b.id);
  };

  const handleDragStart = (event: DragStartEvent) => {
    const { active } = event;
    const item = feedbackItems.find((i) => i.id === active.id);
    setActiveItem(item || null);
  };

  const handleDragEnd = (event: DragEndEvent) => {
    const { active, over } = event;
    setActiveItem(null);

    if (over && active.id !== over.id) {
      const activeItem = feedbackItems.find(item => item.id === active.id);
      
      // Handle dropping over a column (over.id is status)
      const overIsColumn = columns.includes(over.id as Status);
      if (overIsColumn && activeItem) {
          setFeedbackItems(prev => prev.map(item => item.id === active.id ? { ...item, status: over.id as Status } : item));
          return;
      }

      // Handle reordering within a column (dropping over another card)
      const overItem = feedbackItems.find(item => item.id === over.id);
      if (activeItem && overItem && activeItem.status === overItem.status) {
        const oldIndex = getItemsByStatus(activeItem.status).findIndex(item => item.id === active.id);
        const newIndex = getItemsByStatus(overItem.status).findIndex(item => item.id === over.id);

        const sortedColumn = getItemsByStatus(activeItem.status);
        const reorderedColumn = arrayMove(sortedColumn, oldIndex, newIndex);

        const otherItems = feedbackItems.filter(item => item.status !== activeItem.status);
        
        // This is a simplified re-ordering. A more robust solution might involve an order property.
        // For this demo, we can just re-add them.
        setFeedbackItems([...otherItems, ...reorderedColumn]);
      } else if (activeItem && overItem && activeItem.status !== overItem.status) {
        // Handle moving to a new column by dropping on a card
         setFeedbackItems(prev => prev.map(item => item.id === active.id ? { ...item, status: overItem.status } : item));
      }
    }
  };


  return (
    <div className="flex-1 space-y-4">
        <div className="flex items-center justify-between space-y-2">
            <h2 className="text-3xl font-bold tracking-tight">Saran &amp; Kritik</h2>
        </div>
      <DndContext
        sensors={sensors}
        collisionDetection={closestCenter}
        onDragStart={handleDragStart}
        onDragEnd={handleDragEnd}
      >
        <div className="grid grid-cols-1 gap-6 md:grid-cols-3">
          {columns.map((status) => (
            <KanbanColumn key={status} status={status} items={getItemsByStatus(status)}>
              <SortableContext items={getItemsByStatus(status)} strategy={verticalListSortingStrategy}>
                <div className="space-y-4">
                  {getItemsByStatus(status).map((item) => (
                    <FeedbackCard key={item.id} item={item} />
                  ))}
                </div>
              </SortableContext>
            </KanbanColumn>
          ))}
        </div>
        <DragOverlay>
            {activeItem ? <FeedbackCard item={activeItem} isOverlay /> : null}
        </DragOverlay>
      </DndContext>
    </div>
  );
}