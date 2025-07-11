// src/data/profiles.ts

export type ProfileType = 'Perfumer' | 'Brand' | 'Store';

export interface CurationInfo {
  isCurated: boolean;
  curatedAt: string; // ISO 8601 date string
}

export interface Profile {
    slug: string;
    type: ProfileType;
    name: string;
    username: string;
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
  };
  
  export const profiles: Profile[] = [
    {
      slug: 'alex-doe',
      type: 'Perfumer',
      name: 'Alex Doe',
      username: '@alexdoe',
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
    },
    {
        slug: 'antoine-leduc',
        type: 'Perfumer',
        name: 'Antoine Leduc',
        username: '@perfume_maestro',
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
    },
    {
      slug: 'maison-de-reve',
      type: 'Brand',
      name: 'Maison de Rêve',
      username: '@maisonderêve',
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
      bio: 'Exploring the darker, mystical side of perfumery with a focus on woody, resinous, and spicy notes. Our scents are for the bold and the introspective.',
      profilePicture: 'https://placehold.co/128x128.png',
      imageHint: 'dark mysterious logo',
      socials: {
        instagram: 'https://instagram.com/foretnoire',
      },
    },
  ];