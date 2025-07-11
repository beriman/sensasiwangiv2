export type PerfumerProfile = {
    slug: string;
    name: string;
    username: string;
    bio: string;
    profilePicture?: string;
    imageHint: string;
    socials: {
      twitter?: string;
      instagram?: string;
      website?: string;
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
      socials: {
        twitter: 'https://twitter.com/alexdoe',
        instagram: 'https://instagram.com/alexdoe',
        website: 'https://sensasiwangi.id',
      },
    },
    {
        slug: 'antoine-leduc',
        name: 'Antoine Leduc',
        username: '@perfume_maestro',
        bio: 'French perfumer with 20 years of experience in crafting woody and spicy scents. My creations are a tribute to nature\'s raw elegance.',
        profilePicture: 'https://placehold.co/128x128.png',
        imageHint: 'professional perfumer',
        socials: {
          twitter: 'https://twitter.com/leducparfums',
          website: 'https://leducparfums.com',
        },
      },
  ];
  
