
// src/data-hooks/useAnalyticsData.ts
'use client';

import { useState, useEffect } from 'react';

// Mock data - in a real app, this would come from an API
const mockSalesData = [
  { date: 'Jan 23', Sales: 2890 },
  { date: 'Feb 23', Sales: 2756 },
  { date: 'Mar 23', Sales: 3322 },
  { date: 'Apr 23', Sales: 3470 },
  { date: 'May 23', Sales: 3475 },
  { date: 'Jun 23', Sales: 3129 },
];

const mockCategoryData = [
  { name: 'Parfum', value: 9800 },
  { name: 'Raw Material', value: 4567 },
  { name: 'Tools', value: 3908 },
  { name: 'Misc', value: 2400 },
];

// Simulate an API call
const fetchAnalyticsData = async () => {
  await new Promise(resolve => setTimeout(resolve, 800)); // Simulate network delay
  return { salesData: mockSalesData, categoryData: mockCategoryData };
};

export const useAnalyticsData = () => {
  const [salesData, setSalesData] = useState<any[]>([]);
  const [categoryData, setCategoryData] = useState<any[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);

  useEffect(() => {
    const loadData = async () => {
      try {
        setLoading(true);
        const data = await fetchAnalyticsData();
        setSalesData(data.salesData);
        setCategoryData(data.categoryData);
        setError(null);
      } catch (err) {
        setError('Gagal memuat data analitik.');
        console.error(err);
      } finally {
        setLoading(false);
      }
    };

    loadData();
  }, []);

  return { salesData, categoryData, loading, error };
};
