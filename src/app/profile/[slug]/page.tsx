// src/app/profile/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { profiles, type Profile } from '@/data/profiles';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EditProfileDialog, type ProfileData } from '@/components/edit-profile-dialog';
import { Twitter, Instagram, Link as LinkIcon, UserPlus, UserCheck, MessageSquare, Youtube, Facebook, Badge } from 'lucide-react';
import { Badge as UiBadge } from '@/components/ui/badge';

const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 7.333a4.23 4.23 0 0 0-3.18-3.181A4.23 4.23 0 0 0 16.667 3h-3.334a.5.5 0 0 0-.5.5v11.167a3.333 3.333 0 1 1-2.222-3.142" />
        <path d="M13.833 8.333a3.333 3.333 0 1 1 4.518 4.518" />
    </svg>
);


export default function ProfilePage() {
  const params = useParams();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  const [profile, setProfile] = useState<Profile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  useEffect(() => {
    const foundProfile = profiles.find((p) => p.slug === slug);
    if (foundProfile) {
      setProfile(foundProfile);
    } else {
      notFound();
    }
  }, [slug]);

  const handleProfileSave = (newProfileData: ProfileData) => {
    if (profile) {
      // In a real app, you would send this data to your backend to save.
      // For this demo, we'll just update the local state.
      const updatedProfile: Profile = {
        ...profile,
        ...newProfileData,
        // Since followers/following aren't in ProfileData, we keep the existing ones
      };
      setProfile(updatedProfile);
    }
    setIsDialogOpen(false);
  };

  if (!profile) {
    // You can show a loading spinner here
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <p>Loading profile...</p>
        </div>
    );
  }

  // This maps the Profile to the ProfileData expected by the dialog
  const profileDataForDialog: ProfileData = {
    ...profile,
    profilePicture: profile.profilePicture || 'https://placehold.co/128x128.png',
  };

  return (
    <div className="min-h-screen bg-background font-body">
      <AppHeader />
      <main className="container mx-auto px-4 py-8">
        <Card className="mx-auto max-w-2xl rounded-2xl border-none bg-transparent shadow-neumorphic">
          <CardContent className="p-6 md:p-10">
            <div className="flex flex-col items-center text-center sm:flex-row sm:items-start sm:text-left">
              <div className="relative mb-4 h-24 w-24 shrink-0 sm:mb-0 sm:mr-8 md:h-32 md:w-32">
                <Image
                  src={profile.profilePicture || 'https://placehold.co/128x128.png'}
                  alt="Profile picture"
                  width={128}
                  height={128}
                  className="rounded-full shadow-neumorphic-inset"
                  data-ai-hint={profile.imageHint}
                />
              </div>
              <div className="flex-grow">
                <div className="flex items-center justify-center sm:justify-start gap-3">
                    <h1 className="text-2xl font-bold text-foreground md:text-3xl">{profile.name}</h1>
                    <UiBadge variant="outline">{profile.type}</UiBadge>
                </div>
                <p className="text-md text-muted-foreground">{profile.username}</p>
                 {profile.type === 'Perfumer' && (
                    <div className="mt-3 flex justify-center gap-4 text-sm sm:justify-start">
                    <div className="text-foreground/90">
                        <span className="font-bold">{profile.followers?.toLocaleString()}</span>
                        <span className="text-muted-foreground"> Followers</span>
                    </div>
                    <div className="text-foreground/90">
                        <span className="font-bold">{profile.following?.toLocaleString()}</span>
                        <span className="text-muted-foreground"> Following</span>
                    </div>
                    </div>
                 )}
                <div className="mt-4 flex flex-wrap justify-center gap-4 sm:justify-start">
                  {profile.socials.twitter && (
                    <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                  {profile.socials.instagram && (
                    <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                  {profile.socials.tiktok && (
                    <a href={profile.socials.tiktok} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
                        <TikTokIcon />
                    </a>
                  )}
                  {profile.socials.youtube && (
                    <a href={profile.socials.youtube} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
                        <Youtube className="h-6 w-6" />
                    </a>
                  )}
                  {profile.socials.facebook && (
                    <a href={profile.socials.facebook} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
                        <Facebook className="h-6 w-6" />
                    </a>
                  )}
                  {profile.socials.website && (
                    <a href={profile.socials.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent">
                      <LinkIcon className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <p className="mt-6 text-base text-foreground/80">{profile.bio}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => setIsDialogOpen(true)} variant="outline" className="rounded-xl px-8 py-6 shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                Edit Profile
              </Button>
              <Button asChild className="rounded-xl px-8 py-6 shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                <Link href="/dashboard/messages">
                    <MessageSquare className="mr-2" /> Message
                </Link>
              </Button>
              {profile.type === 'Perfumer' && (
                <Button
                    onClick={() => setIsFollowing(!isFollowing)}
                    className="rounded-xl bg-accent-gradient px-8 py-6 text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
                >
                    {isFollowing ? <UserCheck className="mr-2" /> : <UserPlus className="mr-2" />}
                    {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </div>
          </CardContent>
        </Card>
      </main>
      <EditProfileDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        profileData={profileDataForDialog}
        onSave={handleProfileSave}
      />
    </div>
  );
}
