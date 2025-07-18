import { useState } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { Button } from '@/components/ui/button';
import { Badge as UiBadge } from '@/components/ui/badge';
import { EditProfileDialog, type ProfileData } from '@/components/edit-profile-dialog';
import { CurationDialog } from '@/components/curation-dialog';
import { Twitter, Instagram, Link as LinkIcon, UserPlus, UserCheck, MessageSquare, Youtube, Facebook, Ribbon } from 'lucide-react';
import { useToast } from '@/hooks/use-toast';
import { type Profile } from '@/lib/types';
import { TikTokIcon } from '@/components/icons/tiktok-icon';

interface ProfileHeaderProps {
  profile: Profile;
  isOwnProfile: boolean;
  averageRating: number;
  reviewCount: number;
  onProfileSave: (newProfileData: ProfileData) => void;
}

export function ProfileHeader({ profile, isOwnProfile, averageRating, reviewCount, onProfileSave }: ProfileHeaderProps) {
  const { toast } = useToast();
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCurationDialogOpen, setIsCurationDialogOpen] = useState(false);

  const handleFollow = () => {
    // Mock logic, replace with actual API call
    setIsFollowing(!isFollowing);
    toast({ title: isFollowing ? `Unfollowed ${profile.name}` : `Followed ${profile.name}` });
  };

  const profileDataForDialog: ProfileData = {
    ...profile,
    profilePicture: profile.profilePicture || 'https://placehold.co/128x128.png',
  };

  const canApplyForCuration = !profile.curation?.isCurated && (profile.type === 'Brand' || profile.type === 'Perfumer');

  return (
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
        <div className="flex flex-col items-center gap-2 sm:flex-row sm:items-start">
          <div className="flex items-center gap-3">
            <h1 className="text-2xl font-bold text-foreground md:text-3xl">{profile.name}</h1>
            <UiBadge variant="outline">{profile.type}</UiBadge>
          </div>
        </div>
        <p className="text-md text-muted-foreground">{profile.username}</p>
        <div className="mt-3 flex justify-center gap-4 text-sm sm:justify-start">
          <div className="text-foreground/90 flex items-center gap-1">
            <span className="font-bold">{averageRating.toFixed(1)}</span>
            <span className="text-muted-foreground">({reviewCount} reviews)</span>
          </div>
          <div className="text-foreground/90">
            <span className="font-bold">{profile.followers?.toLocaleString()}</span>
            <span className="text-muted-foreground"> Followers</span>
          </div>
        </div>
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
        <div className="mt-8 flex flex-col gap-3 sm:flex-row sm:justify-center">
          {isOwnProfile ? (
            <>
              <Button onClick={() => setIsEditDialogOpen(true)} variant="outline" className="rounded-xl px-8 py-6 shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                Edit Profile
              </Button>
              {canApplyForCuration && (
                <Button onClick={() => setIsCurationDialogOpen(true)} variant="outline" className="rounded-xl border-blue-500/50 px-8 py-6 text-blue-700 shadow-neumorphic transition-all hover:border-blue-500 hover:shadow-neumorphic-active">
                  <Ribbon className="mr-2" /> Ajukan Kurasi
                </Button>
              )}
            </>
          ) : (
            <>
              <Button asChild className="rounded-xl px-8 py-6 shadow-neumorphic transition-all hover:shadow-neumorphic-active">
                <Link href="/dashboard/messages">
                  <MessageSquare className="mr-2" /> Message
                </Link>
              </Button>
              {profile.type === 'Perfumer' && (
                <Button
                  onClick={handleFollow}
                  className="rounded-xl bg-accent-gradient px-8 py-6 text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
                >
                  {isFollowing ? <UserCheck className="mr-2" /> : <UserPlus className="mr-2" />}
                  {isFollowing ? 'Following' : 'Follow'}
                </Button>
              )}
            </>
          )}
        </div>
      </div>
      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        profileData={profileDataForDialog}
        onSave={onProfileSave}
      />
      <CurationDialog
        isOpen={isCurationDialogOpen}
        onOpenChange={setIsCurationDialogOpen}
        profileName={profile.name}
      />
    </div>
  );
}
