export type PerfumerProfile = {
    slug: string;
    name: string;
    username: string;
    bio: string;
    profilePicture?: string;
    imageHint: string;
    followers: number;
    following: number;
    socials: {
      twitter?: string;
      instagram?: string;
      website?: string;
      tiktok?: string;
      youtube?: string;
      facebook?: string;
    };
  };
  
  export const perfumers: PerfumerProfile[] = [
    {
      slug: 'alex-doe',
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
  ];
  
