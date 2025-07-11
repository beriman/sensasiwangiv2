// This file is now a fallback for the main user's profile
// Dynamic profiles are handled by /src/app/profile/[slug]/page.tsx
'use client';

import { useEffect } from 'react';
import { useRouter } from 'next/navigation';
import { profiles } from '@/data/profiles'; // We will show the first perfumer as the default

export default function ProfileRedirectPage() {
  const router = useRouter();

  useEffect(() => {
    // Redirect to the first perfumer's profile, or a default user profile.
    // In a real app, this would redirect to the logged-in user's profile.
    if (profiles.length > 0) {
      router.replace(`/profile/${profiles[0].slug}`);
    } else {
      // Fallback if no perfumers exist
      router.replace('/');
    }
  }, [router]);

  return (
    <div className="flex h-screen items-center justify-center bg-background">
      <p>Redirecting to profile...</p>
    </div>
  );
}
