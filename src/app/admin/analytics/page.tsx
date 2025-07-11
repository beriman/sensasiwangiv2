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

const salesData = [
  { date: 'Jan 23', Sales: 2890 },
  { date: 'Feb 23', Sales: 2756 },
  { date: 'Mar 23', Sales: 3322 },
  { date: 'Apr 23', Sales: 3470 },
  { date: 'May 23', Sales: 3475 },
  { date: 'Jun 23', Sales: 3129 },
];

const categoryData = [
  { name: 'Parfum', value: 9800 },
  { name: 'Raw Material', value: 4567 },
  { name: 'Tools', value: 3908 },
  { name: 'Misc', value: 2400 },
];

export default function AdminAnalyticsPage() {
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
