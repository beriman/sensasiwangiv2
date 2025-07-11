
'use client';

import { useState } from 'react';
import Image from 'next/image';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent } from '@/components/ui/card';
import { EditProfileDialog, type ProfileData } from '@/components/edit-profile-dialog';
import { Twitter, Instagram, Link as LinkIcon, UserPlus, UserCheck } from 'lucide-react';

const initialProfileData: ProfileData = {
  name: 'Alex Doe',
  username: '@alexdoe',
  bio: 'Perfumery enthusiast & scent explorer. Sharing my journey through the world of fragrances. Collector of rare materials. Founder of sensasiwangi.id.',
  profilePicture: 'https://placehold.co/128x128.png',
  imageHint: 'profile picture',
  socials: {
    twitter: 'https://twitter.com/alexdoe',
    instagram: 'https://instagram.com/alexdoe',
    website: 'https://sensasiwangi.id',
  },
};

export default function ProfilePage() {
  const [profile, setProfile] = useState<ProfileData>(initialProfileData);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isDialogOpen, setIsDialogOpen] = useState(false);

  const handleProfileSave = (newProfileData: ProfileData) => {
    setProfile(newProfileData);
    setIsDialogOpen(false);
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
                  src={profile.profilePicture}
                  alt="Profile picture"
                  width={128}
                  height={128}
                  className="rounded-full shadow-neumorphic-inset"
                  data-ai-hint={profile.imageHint}
                />
              </div>
              <div className="flex-grow">
                <h1 className="text-2xl font-bold text-foreground md:text-3xl">{profile.name}</h1>
                <p className="text-md text-muted-foreground">{profile.username}</p>
                <div className="mt-4 flex justify-center gap-4 sm:justify-start">
                  {profile.socials.twitter && (
                    <a href={profile.socials.twitter} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-foreground">
                      <Twitter className="h-6 w-6" />
                    </a>
                  )}
                  {profile.socials.instagram && (
                    <a href={profile.socials.instagram} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-foreground">
                      <Instagram className="h-6 w-6" />
                    </a>
                  )}
                  {profile.socials.website && (
                    <a href={profile.socials.website} target="_blank" rel="noopener noreferrer" className="text-muted-foreground hover:text-accent-foreground">
                      <LinkIcon className="h-6 w-6" />
                    </a>
                  )}
                </div>
              </div>
            </div>
            <p className="mt-6 text-base text-foreground/80">{profile.bio}</p>
            <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
              <Button onClick={() => setIsDialogOpen(true)} className="rounded-xl px-8 py-6 shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                Edit Profile
              </Button>
              <Button
                onClick={() => setIsFollowing(!isFollowing)}
                className="rounded-xl bg-accent-gradient px-8 py-6 text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
              >
                {isFollowing ? <UserCheck className="mr-2" /> : <UserPlus className="mr-2" />}
                {isFollowing ? 'Following' : 'Follow'}
              </Button>
            </div>
          </CardContent>
        </Card>
      </main>
      <EditProfileDialog
        isOpen={isDialogOpen}
        onOpenChange={setIsDialogOpen}
        profileData={profile}
        onSave={handleProfileSave}
      />
    </div>
  );
}

