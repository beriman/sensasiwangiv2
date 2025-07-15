// src/data/profiles.ts

export type ProfileType = 'Perfumer' | 'Brand' | 'Store' | 'Buyer';
export type ModeratorRole = 'Admin' | 'Marketplace' | 'School' | 'Forum' | 'Curation';
export type BadgeType = 'reviewer' | 'student' | 'collector' | 'sambatan';

export interface CurationInfo {
  isCurated: boolean;
  curatedAt: string; // ISO 8601 date string
}

export interface Profile {
    slug: string;
    type: ProfileType;
    name: string;
    username: string;
    email: string;
    bio: string;
    profilePicture?: string;
    imageHint: string;
    followers?: number;
    following?: number;
    socials: {
      twitter?: string;
      instagram?: string;
      website?: string;
      tiktok?: string;
      youtube?: string;
      facebook?: string;
    };
    curation?: CurationInfo;
    moderatorRoles?: ModeratorRole[];
    badges?: BadgeType[];
  };
  
  export const profiles: Profile[] = [
    {
      slug: 'alex-doe',
      type: 'Perfumer',
      name: 'Alex Doe',
      username: '@alexdoe',
      email: 'admin@sensasiwangi.id',
      bio: 'Perfumery enthusiast & scent explorer. Sharing my journey through the world of fragrances. Collector of rare materials. Founder of sensasiwangi.id.',
      profilePicture: 'https://placehold.co/128x128.png',
      imageHint: 'profile picture person',
      followers: 12500,
      following: 350,
      socials: {
        twitter: 'https://twitter.com/alexdoe',
        instagram: 'https://instagram.com/alexdoe',
        website: 'https://sensasiwangi.id',
        tiktok: 'https://www.tiktok.com/@perfumetok',
        youtube: 'https://www.youtube.com/@fragrancereviews',
      },
      moderatorRoles: ['Admin', 'Forum'],
      badges: ['reviewer', 'student'],
    },
    {
        slug: 'antoine-leduc',
        type: 'Perfumer',
        name: 'Antoine Leduc',
        username: '@perfume_maestro',
        email: 'antoine.leduc@example.com',
        bio: 'French perfumer with 20 years of experience in crafting woody and spicy scents. My creations are a tribute to nature\'s raw elegance.',
        profilePicture: 'https://placehold.co/128x128.png',
        imageHint: 'professional perfumer',
        followers: 8900,
        following: 120,
        socials: {
          twitter: 'https://twitter.com/leducparfums',
          website: 'https://leducparfums.com',
          facebook: 'https://www.facebook.com/leducparfums',
        },
        badges: ['sambatan'],
    },
    {
      slug: 'curator-a',
      type: 'Perfumer',
      name: 'Curator A',
      username: '@curator_a',
      email: 'curator.a@sensasiwangi.id',
      bio: 'Lead curator for Nusantarum, ensuring the highest standards of artisan perfumery on the platform.',
      profilePicture: 'https://placehold.co/128x128.png',
      imageHint: 'curator profile',
      socials: {},
      moderatorRoles: ['Curation'],
    },
    {
      slug: 'maison-de-reve',
      type: 'Brand',
      name: 'Maison de Rêve',
      username: '@maisonderêve',
      email: 'contact@maisonderêve.com',
      bio: 'Artisanal perfume house from Paris, specializing in high-quality floral fragrances. Each bottle is a dream captured in scent. Founded by Alex Doe.',
      profilePicture: 'https://placehold.co/128x128.png',
      imageHint: 'brand logo elegant',
      socials: {
        instagram: 'https://instagram.com/maisonderêve',
        website: 'https://maisonderêve.com',
      },
      curation: {
        isCurated: true,
        curatedAt: new Date('2024-05-15T00:00:00Z').toISOString(),
      }
    },
    {
      slug: 'foret-noire-parfums',
      type: 'Brand',
      name: 'Forêt Noire Parfums',
      username: '@foretnoire',
      email: 'contact@foretnoire.com',
      bio: 'Exploring the darker, mystical side of perfumery with a focus on woody, resinous, and spicy notes. Our scents are for the bold and the introspective.',
      profilePicture: 'https://placehold.co/128x128.png',
      imageHint: 'dark mysterious logo',
      socials: {
        instagram: 'https://instagram.com/foretnoire',
      },
    },
    {
        slug: 'budi-hartono',
        type: 'Buyer',
        name: 'Budi Hartono',
        username: '@budi_scent',
        email: 'budi.h@example.com',
        bio: 'Scent enthusiast and collector from Jakarta.',
        profilePicture: 'https://placehold.co/128x128.png?text=BH',
        imageHint: 'profile man',
        socials: {},
        badges: ['collector'],
    },
    {
        slug: 'citra-lestari',
        type: 'Buyer',
        name: 'Citra Lestari',
        username: '@citralestari',
        email: 'citra.l@example.com',
        bio: 'Learning to make my own perfumes. Excited to be part of this community!',
        profilePicture: 'https://placehold.co/128x128.png?text=CL',
        imageHint: 'profile woman',
        socials: {
          instagram: 'https://instagram.com/citralestari'
        },
    },
  ];
