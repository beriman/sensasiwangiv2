'use client';

import { useParams } from 'next/navigation';
import { useProfileDetails } from '@/hooks/use-profile-details';
import { useAuth } from '@/context/AuthContext';
import { AppHeader } from '@/components/header';
import { Card, CardContent } from '@/components/ui/card';
import { ProfileHeader } from '@/components/profile/profile-header';
import { ProfileBadges } from '@/components/profile/profile-badges';
import { ProfileTabs } from '@/components/profile/profile-tabs';
import { type ProfileData } from '@/components/edit-profile-dialog';
import { useToast } from '@/hooks/use-toast';

export default function ProfilePage() {
  const params = useParams();
  const { toast } = useToast();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const { user } = useAuth();
  const { profile, sellerProducts, sellerReviews, averageRating, loading, error, setProfile, refetch } = useProfileDetails(slug);

  const handleProfileSave = async (newProfileData: ProfileData) => {
    if (profile?.slug !== user?.slug) {
      toast({
        variant: 'destructive',
        title: 'Akses Ditolak',
        description: 'Anda hanya dapat mengedit profil Anda sendiri.',
      });
      return;
    }

    // Here you would typically call an API to update the profile
    // For now, we'll just update the local state
    const updatedProfile = { ...profile, ...newProfileData };
    setProfile(updatedProfile as any);
    toast({
      title: 'Profil Diperbarui',
      description: 'Perubahan pada profil Anda telah disimpan.',
    });
    refetch(); // Refetch data to ensure consistency
  };

  if (loading) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p>Loading profile...</p>
      </div>
    );
  }

  if (error || !profile) {
    return (
      <div className="flex h-screen items-center justify-center bg-background">
        <p>{error || 'Profile not found.'}</p>
      </div>
    );
  }

  const isOwnProfile = profile.slug === user?.slug;

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-4xl rounded-2xl border-none bg-transparent p-6 shadow-neumorphic md:p-10">
          <CardContent className="p-0">
            <ProfileHeader
              profile={profile}
              isOwnProfile={isOwnProfile}
              averageRating={averageRating}
              reviewCount={sellerReviews.length}
              onProfileSave={handleProfileSave}
            />
            <ProfileBadges profile={profile} />
            <p className="mt-6 text-base text-foreground/80">{profile.bio}</p>
          </CardContent>
        </Card>
        <ProfileTabs products={sellerProducts} reviews={sellerReviews} />
      </main>
    </div>
  );
}
