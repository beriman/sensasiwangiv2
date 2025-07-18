import { useState, useEffect } from 'react';
import Link from 'next/link';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { Table, TableBody, TableCell, TableHead, TableHeader, TableRow } from '@/components/ui/table';
import { Badge } from '@/components/ui/badge';
import { Button } from '@/components/ui/button';
import { createClient } from '@/lib/supabase';
import type { Product } from '@/lib/types';

const supabase = createClient();
const ITEMS_PER_PAGE = 10;

export function ParfumsTabContent() {
  const [parfums, setParfums] = useState<Product[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState<string | null>(null);
  const [page, setPage] = useState(1);
  const [hasMore, setHasMore] = useState(true);

  useEffect(() => {
    const fetchParfums = async () => {
      setLoading(true);
      setError(null);

      const startIndex = (page - 1) * ITEMS_PER_PAGE;
      const endIndex = startIndex + ITEMS_PER_PAGE - 1;

      const { data, error, count } = await supabase
        .from('products')
        .select('*', { count: 'exact' })
        .eq('category', 'Parfum')
        .range(startIndex, endIndex);

      if (error) {
        setError(error.message);
      } else {
        setParfums(data as Product[]);
        setHasMore(count ? count > endIndex + 1 : false);
      }
      setLoading(false);
    };

    fetchParfums();
  }, [page]);

  return (
    <Card className="rounded-2xl border-none bg-transparent shadow-neumorphic">
      <CardHeader>
        <CardTitle className="text-xl font-bold text-foreground/80">All Parfums</CardTitle>
        <CardDescription>A complete list of all perfumes in our database.</CardDescription>
      </CardHeader>
      <CardContent>
        {loading ? (
          <div className="text-center py-12">Loading...</div>
        ) : error ? (
          <div className="text-center py-12 text-red-500">{error}</div>
        ) : (
          <>
            <Table>
              <TableHeader>
                <TableRow>
                  <TableHead>Perfume</TableHead>
                  <TableHead>Brand</TableHead>
                  <TableHead>Scent Profile</TableHead>
                </TableRow>
              </TableHeader>
              <TableBody>
                {parfums.map(parfum => (
                  <TableRow key={parfum.id}>
                    <TableCell className="font-medium">
                      <Link href={`/products/${parfum.id}`} className="hover:text-accent hover:underline">
                        {parfum.name}
                      </Link>
                    </TableCell>
                    <TableCell>{parfum.properties.Brand}</TableCell>
                    <TableCell>
                      <Badge variant="secondary">{parfum.properties['Scent Profile']}</Badge>
                    </TableCell>
                  </TableRow>
                ))}
              </TableBody>
            </Table>
            {parfums.length === 0 && (
              <div className="text-center py-12 text-muted-foreground">No parfums found.</div>
            )}
            <div className="flex justify-between mt-4">
              <Button onClick={() => setPage(page - 1)} disabled={page === 1}>
                Previous
              </Button>
              <Button onClick={() => setPage(page + 1)} disabled={!hasMore}>
                Next
              </Button>
            </div>
          </>
        )}
      </CardContent>
    </Card>
  );
}
