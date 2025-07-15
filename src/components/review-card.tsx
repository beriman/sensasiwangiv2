// src/components/review-card.tsx
'use client';

import Image from 'next/image';
import { Card, CardContent, CardHeader } from '@/components/ui/card';
import { Avatar, AvatarFallback, AvatarImage } from '@/components/ui/avatar';
import { Star } from 'lucide-react';
import { format, formatDistanceToNow } from 'date-fns';
import { id } from 'date-fns/locale';
import type { Review } from '@/data/reviews';

interface ReviewCardProps {
  review: Review;
}

const formatTimestamp = (timestamp: string) => {
    return formatDistanceToNow(new Date(timestamp), { addSuffix: true, locale: id });
}

export function ReviewCard({ review }: ReviewCardProps) {
  return (
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader className="flex flex-row items-center gap-4 p-4 pb-2">
        <Avatar>
          <AvatarImage src={review.reviewerImage} alt={review.reviewerName} />
          <AvatarFallback>{review.reviewerName.charAt(0)}</AvatarFallback>
        </Avatar>
        <div className="flex-grow">
          <p className="font-bold text-foreground/80">{review.reviewerName}</p>
          <p className="text-xs text-muted-foreground" title={format(new Date(review.date), "PPP")}>
            {formatTimestamp(review.date)}
          </p>
        </div>
        <div className="flex items-center gap-1">
          {[...Array(5)].map((_, i) => (
            <Star
              key={i}
              className={`h-5 w-5 ${i < review.rating ? 'text-yellow-400' : 'text-muted-foreground/30'}`}
              fill="currentColor"
            />
          ))}
        </div>
      </CardHeader>
      <CardContent className="p-4 pt-2">
        <p className="text-base text-foreground/80 whitespace-pre-wrap">{review.comment}</p>
      </CardContent>
    </Card>
  );
}
