// This file is now a fallback for the main user's profile
// Dynamic profiles are handled by /src/app/profile/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { useAuth } from '@/context/AuthContext';

export default function ProfileRedirectPage() {
  const router = useRouter();
  const { user, loading } = useAuth();

  useEffect(() => {
    if (!loading) {
      if (user) {
        router.replace(`/profile/${user.slug}`);
      } else {
        // If no user is logged in, redirect to home or login page
        router.replace('/');
      }
    }
  }, [router, user, loading]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p>Redirecting to profile...</p>
    </div>
  );
}
