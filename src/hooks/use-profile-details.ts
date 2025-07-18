import { useState, useCallback } from 'react';
import { createClient } from '@/lib/supabase';
import type { Profile, Product, Review } from '@/lib/types';
import { useQuery } from '@tanstack/react-query';

const supabase = createClient();

interface UseProfileDetailsResult {
  profile: Profile | null;
  sellerProducts: Product[];
  sellerReviews: Review[];
  averageRating: number;
  loading: boolean;
  error: string | null;
  setProfile: (profile: Profile | null) => void;
  refetch: () => void;
}

export const useProfileDetails = (slug: string | string[] | undefined): UseProfileDetailsResult => {
  const [profile, setProfile] = useState<Profile | null>(null); // Keep local state for profile updates

  const fetchProfileData = useCallback(async () => {
    if (!slug) {
      return { profile: null, sellerProducts: [], sellerReviews: [], averageRating: 0 };
    }

    // Fetch profile
    const { data: profileData, error: profileError } = await supabase
      .from('profiles')
      .select('*')
      .eq('slug', slug)
      .single();

    if (profileError || !profileData) {
      throw new Error(profileError?.message || 'Profile not found.');
    }

    // Fetch products and reviews in parallel
    const [
      { data: productsData, error: productsError },
      { data: reviewsData, error: reviewsError }
    ] = await Promise.all([
      supabase.from('products').select('*').eq('perfumerProfileSlug', profileData.slug),
      supabase.from('reviews').select('*').eq('sellerSlug', profileData.slug)
    ]);

    if (productsError) throw new Error(productsError.message);
    if (reviewsError) throw new Error(reviewsError.message);

    const reviews = (reviewsData as Review[]) || [];
    const products = (productsData as Product[]) || [];

    // Calculate average rating
    const averageRating = reviews.length > 0
      ? reviews.reduce((acc, review) => acc + review.rating, 0) / reviews.length
      : 0;

    return { profile: profileData as Profile, sellerProducts: products, sellerReviews: reviews, averageRating };
  }, [slug]);

  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ['profile', slug],
    queryFn: fetchProfileData,
    enabled: !!slug,
    onSuccess: (data) => {
      setProfile(data.profile);
    },
  });

  return {
    profile: profile || data?.profile || null,
    sellerProducts: data?.sellerProducts || [],
    sellerReviews: data?.sellerReviews || [],
    averageRating: data?.averageRating || 0,
    loading: isLoading,
    error: error ? error.message : null,
    setProfile,
    refetch,
  };
};

