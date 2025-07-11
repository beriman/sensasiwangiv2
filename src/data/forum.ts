// src/data/forum.ts
import { products } from './products';
import { perfumers } from './perfumers';

export interface Post {
  author: string;
  content: string;
}

export interface Thread {
  id: string;
  categoryId: 'perfumer-corner' | 'ngobrolin-parfum';
  title: string;
  author: string;
  content: string;
  posts: Post[];
}

export interface ForumCategory {
  id: 'perfumer-corner' | 'ngobrolin-parfum';
  name: string;
  description: string;
}

export const forumCategories: ForumCategory[] = [
  {
    id: 'perfumer-corner',
    name: "Perfumer's Corner",
    description: 'Discuss techniques, materials, and the art of scent creation.',
  },
  {
    id: 'ngobrolin-parfum',
    name: 'Ngobrolin Parfum',
    description: 'Share your thoughts, reviews, and experiences with various perfumes.',
  },
];

// --- Automatic Thread Generation for Perfume Products ---
const productThreads: Thread[] = products
  .filter(p => p.category === 'Parfum')
  .map(product => {
    const perfumer = perfumers.find(perf => perf.slug === product.perfumerProfileSlug);
    const authorName = perfumer ? perfumer.name : 'System';

    return {
      id: `product-${product.id}`,
      categoryId: 'ngobrolin-parfum',
      title: product.name,
      author: product.properties.Perfumer || 'Anonymous Perfumer',
      content: `This is the official discussion thread for ${product.name} by ${product.properties.Brand}. Share your thoughts, reviews, and scent experiences below!`,
      posts: [
        {
          author: 'Alex Doe',
          content: `I've just tried this one! The opening is a beautiful blast of jasmine. Has anyone else noticed the subtle green note in the dry-down?`,
        },
        {
            author: 'Antoine Leduc',
            content: `As the creator of an adjacent fragrance, I appreciate the complexity here. The balance is exquisite.`,
        }
      ],
    };
  });

// --- Sample Manual Threads ---
const manualThreads: Thread[] = [
  {
    id: 'tech-1',
    categoryId: 'perfumer-corner',
    title: 'Tips for working with viscous absolutes?',
    author: 'Alex Doe',
    content: "I'm having trouble getting my jasmine absolute to a workable viscosity without heating it too much. Any advice on gentle warming techniques or safe solvents to use for dilution? Thanks!",
    posts: [
      {
        author: 'Antoine Leduc',
        content: 'A water bath is your best friend here. Very gentle, even heat. I also sometimes pre-dilute my absolutes in perfumer\'s alcohol to create a 10% solution which is much easier to work with.',
      },
    ],
  },
  {
    id: 'tech-2',
    categoryId: 'perfumer-corner',
    title: 'Favorite Sandalwood Alternatives',
    author: 'Antoine Leduc',
    content: 'With Mysore Sandalwood being so precious, what are your go-to alternatives, both natural and synthetic, that provide a similar creamy, woody profile?',
    posts: [],
  },
];

export const allThreads: Thread[] = [...manualThreads, ...productThreads];

// --- Helper Functions ---
export const getThreadsByCategory = (categoryId: string) => {
  return allThreads.filter(thread => thread.categoryId === categoryId);
};

export const getThreadById = (threadId: string) => {
  return allThreads.find(thread => thread.id === threadId);
};
