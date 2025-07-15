// src/app/profile/[slug]/page.tsx
'use client';

import { useState, useEffect } from 'react';
import Image from 'next/image';
import Link from 'next/link';
import { notFound, useParams } from 'next/navigation';
import { profiles, type Profile } from '@/data/profiles';
import { products } from '@/data/products';
import { reviews as allReviews } from '@/data/reviews';
import { AppHeader } from '@/components/header';
import { Button } from '@/components/ui/button';
import { Card, CardContent, CardHeader, CardTitle, CardDescription } from '@/components/ui/card';
import { EditProfileDialog, type ProfileData } from '@/components/edit-profile-dialog';
import { CurationDialog } from '@/components/curation-dialog';
import { Twitter, Instagram, Link as LinkIcon, UserPlus, UserCheck, MessageSquare, Youtube, Facebook, BadgeCheck, Ribbon, Star, Store, Palette } from 'lucide-react';
import { Badge as UiBadge } from '@/components/ui/badge';
import { format } from 'date-fns';
import { useToast } from '@/hooks/use-toast';
import { Tabs, TabsContent, TabsList, TabsTrigger } from '@/components/ui/tabs';
import { ProductGrid } from '@/components/product-grid';
import { ReviewCard } from '@/components/review-card';
import { Avatar, AvatarImage, AvatarFallback } from '@/components/ui/avatar';


const TikTokIcon = () => (
    <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round" className="h-6 w-6">
        <path d="M21 7.333a4.23 4.23 0 0 0-3.18-3.181A4.23 4.23 0 0 0 16.667 3h-3.334a.5.5 0 0 0-.5.5v11.167a3.333 3.333 0 1 1-2.222-3.142" />
        <path d="M13.833 8.333a3.333 3.333 0 1 1 4.518 4.518" />
    </svg>
);


export default function ProfilePage() {
  const params = useParams();
  const { toast } = useToast();
  const slug = Array.isArray(params.slug) ? params.slug[0] : params.slug;
  
  // In a real app, this would come from an auth hook like useUser()
  const MOCK_LOGGED_IN_USER_SLUG = 'alex-doe';

  const [profile, setProfile] = useState<Profile | null>(null);
  const [isFollowing, setIsFollowing] = useState(false);
  const [isEditDialogOpen, setIsEditDialogOpen] = useState(false);
  const [isCurationDialogOpen, setIsCurationDialogOpen] = useState(false);

  useEffect(() => {
    const foundProfile = profiles.find((p) => p.slug === slug);
    if (foundProfile) {
      setProfile(foundProfile);
    } else {
      notFound();
    }
  }, [slug]);

  const sellerProducts = products.filter(p => p.perfumerProfileSlug === slug);
  const sellerReviews = allReviews.filter(r => r.sellerSlug === slug);
  const averageRating = sellerReviews.length > 0
    ? sellerReviews.reduce((acc, review) => acc + review.rating, 0) / sellerReviews.length
    : 0;


  const handleProfileSave = (newProfileData: ProfileData) => {
    if (profile?.slug !== MOCK_LOGGED_IN_USER_SLUG) {
      toast({
        variant: 'destructive',
        title: 'Akses Ditolak',
        description: 'Anda hanya dapat mengedit profil Anda sendiri.',
      });
      setIsEditDialogOpen(false);
      return;
    }

    const updatedProfile: Profile = {
      ...profile,
      ...newProfileData,
    };
    setProfile(updatedProfile);
    toast({
      title: 'Profil Diperbarui',
      description: 'Perubahan pada profil Anda telah disimpan.',
    });
    setIsEditDialogOpen(false);
  };

  if (!profile) {
    return (
        <div className="flex h-screen items-center justify-center bg-background">
            <p>Loading profile...</p>
        </div>
    );
  }

  const profileDataForDialog: ProfileData = {
    ...profile,
    profilePicture: profile.profilePicture || 'https://placehold.co/128x128.png',
  };
  
  const canApplyForCuration = !profile.curation?.isCurated && (profile.type === 'Brand' || profile.type === 'Perfumer');
  const isOwnProfile = profile.slug === MOCK_LOGGED_IN_USER_SLUG;

  return (
    <>
      <div className="min-h-screen bg-background font-body">
        <AppHeader />
        <main className="container mx-auto px-4 py-8">
          <Card className="mx-auto max-w-4xl rounded-2xl border-none bg-transparent p-6 shadow-neumorphic md:p-10">
            <CardContent className="p-0">
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
                    {profile.curation?.isCurated && (
                      <div className="flex items-center gap-1.5 rounded-full bg-blue-100 px-3 py-1 text-xs font-semibold text-blue-800">
                        <BadgeCheck className="h-4 w-4" />
                        Terverifikasi oleh Nusantarum
                      </div>
                    )}
                  </div>
                  <p className="text-md text-muted-foreground">{profile.username}</p>
                   <div className="mt-3 flex justify-center gap-4 text-sm sm:justify-start">
                      <div className="text-foreground/90 flex items-center gap-1">
                          <Star className="h-4 w-4 text-yellow-400" fill="currentColor" />
                          <span className="font-bold">{averageRating.toFixed(1)}</span>
                          <span className="text-muted-foreground">({sellerReviews.length} ulasan)</span>
                      </div>
                      <div className="text-foreground/90">
                          <span className="font-bold">{profile.followers?.toLocaleString()}</span>
                          <span className="text-muted-foreground"> Pengikut</span>
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
                </div>
              </div>
              <p className="mt-6 text-base text-foreground/80">{profile.bio}</p>
              {profile.curation?.isCurated && (
                  <p className="mt-4 text-center text-xs text-muted-foreground sm:text-left">
                      Disetujui pada: {format(new Date(profile.curation.curatedAt), 'dd MMMM yyyy')}
                  </p>
              )}
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
                          onClick={() => setIsFollowing(!isFollowing)}
                          className="rounded-xl bg-accent-gradient px-8 py-6 text-accent-foreground shadow-neumorphic transition-all hover:shadow-neumorphic-active"
                      >
                          {isFollowing ? <UserCheck className="mr-2" /> : <UserPlus className="mr-2" />}
                          {isFollowing ? 'Following' : 'Follow'}
                      </Button>
                    )}
                  </>
                )}
              </div>
            </CardContent>
          </Card>
          
          <Tabs defaultValue="products" className="mt-10 mx-auto max-w-4xl">
            <TabsList className="grid w-full grid-cols-2 rounded-xl bg-transparent p-1 shadow-neumorphic-inset">
                <TabsTrigger value="products" className="h-full rounded-lg text-lg text-foreground/70 transition-all duration-300 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
                    <Store className="mr-2 h-5 w-5"/> Produk
                </TabsTrigger>
                <TabsTrigger value="reviews" className="h-full rounded-lg text-lg text-foreground/70 transition-all duration-300 data-[state=active]:bg-accent-gradient data-[state=active]:text-accent-foreground data-[state=active]:shadow-neumorphic-active">
                    <Palette className="mr-2 h-5 w-5"/> Ulasan ({sellerReviews.length})
                </TabsTrigger>
            </TabsList>
            <TabsContent value="products" className="mt-6">
                <ProductGrid products={sellerProducts} />
            </TabsContent>
            <TabsContent value="reviews" className="mt-6">
                <div className="space-y-6">
                    {sellerReviews.map(review => (
                        <ReviewCard key={review.id} review={review} />
                    ))}
                    {sellerReviews.length === 0 && (
                        <div className="text-center py-16 text-muted-foreground rounded-xl shadow-neumorphic-inset">
                            <p className="text-lg">Belum ada ulasan.</p>
                            <p>Penjual ini belum menerima ulasan apa pun.</p>
                        </div>
                    )}
                </div>
            </TabsContent>
          </Tabs>

        </main>
      </div>

      <EditProfileDialog
        isOpen={isEditDialogOpen}
        onOpenChange={setIsEditDialogOpen}
        profileData={profileDataForDialog}
        onSave={handleProfileSave}
      />
      
      <CurationDialog
        isOpen={isCurationDialogOpen}
        onOpenChange={setIsCurationDialogOpen}
        profileName={profile.name}
      />
    </>
  );
}
