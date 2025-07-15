// src/app/admin/analytics/page.tsx
'use client';

import { BarChart, LineChart, DonutChart, Legend } from '@tremor/react';
import {
  Card,
  CardContent,
  CardDescription,
  CardHeader,
  CardTitle,
} from '@/components/ui/card';
import { useAnalyticsData } from '@/data-hooks/useAnalyticsData';
import { Skeleton } from '@/components/ui/skeleton';
import { Alert, AlertDescription, AlertTitle } from '@/components/ui/alert';
import { AlertCircle } from 'lucide-react';

function AnalyticsSkeleton() {
    return (
        <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent>
                    <Skeleton className="h-72 w-full" />
                </CardContent>
            </Card>
            <Card>
                <CardHeader>
                    <Skeleton className="h-6 w-3/4" />
                    <Skeleton className="h-4 w-1/2 mt-2" />
                </CardHeader>
                <CardContent className="flex items-center justify-center">
                    <Skeleton className="h-72 w-72 rounded-full" />
                </CardContent>
            </Card>
        </div>
    );
}

export default function AdminAnalyticsPage() {
  const { salesData, categoryData, loading, error } = useAnalyticsData();

  if (loading) {
    return <AnalyticsSkeleton />;
  }

  if (error) {
    return (
        <Alert variant="destructive">
            <AlertCircle className="h-4 w-4" />
            <AlertTitle>Error</AlertTitle>
            <AlertDescription>{error}</AlertDescription>
        </Alert>
    );
  }

  return (
    <div className="grid gap-6 sm:grid-cols-1 lg:grid-cols-2">
      <Card>
        <CardHeader>
          <CardTitle>Sales Over Time</CardTitle>
          <CardDescription>
            A chart showing sales performance over the last 6 months.
          </CardDescription>
        </CardHeader>
        <CardContent>
          <LineChart
            className="mt-4 h-72"
            data={salesData}
            index="date"
            categories={['Sales']}
            colors={['blue']}
            yAxisWidth={30}
          />
        </CardContent>
      </Card>
      <Card>
        <CardHeader>
          <CardTitle>Sales by Category</CardTitle>
          <CardDescription>
            A breakdown of sales across different product categories.
          </CardDescription>
        </CardHeader>
        <CardContent className="flex items-center justify-center">
            <DonutChart
                className="mt-4 h-72"
                data={categoryData}
                category="value"
                index="name"
                colors={['cyan', 'indigo', 'violet', 'fuchsia']}
            />
        </CardContent>
      </Card>
    </div>
  );
}
