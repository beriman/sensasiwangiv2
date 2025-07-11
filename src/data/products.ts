import type { Product } from '@/lib/types';

const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

export const products: Product[] = [
  // Parfum
  {
    id: 'p1',
    name: 'Eau de Lumière',
    description: 'A radiant floral fragrance with notes of jasmine, tuberose, and a hint of citrus.',
    price: 1200000,
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'perfume bottle',
    properties: { 
      'Scent Profile': 'Floral', 
      'Concentration': 'EDP',
      'Brand': 'Maison de Rêve',
      'Perfumer': 'Alex Doe',
      'Variant': '50ml / 100ml'
    },
    perfumerProfileSlug: 'alex-doe',
  },
  {
    id: 'p2',
    name: 'Boisé Mystique (Bagi Sambatan Vial)',
    description: 'An enchanting woody scent. Join our group buy to get a vial decant at a special price! The seller will purchase a full bottle and share it into smaller vials.',
    price: 1350000,
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'elegant perfume',
    properties: { 
      'Scent Profile': 'Woody', 
      'Concentration': 'EDP',
      'Brand': 'Forêt Noire Parfums',
      'Perfumer': 'Antoine Leduc',
      'Variant': '75ml'
    },
    perfumerProfileSlug: 'antoine-leduc',
    sambatan: {
      isActive: true,
      targetParticipants: 10,
      currentParticipants: 7,
      deadline: oneWeekFromNow.toISOString(),
      sambatanPrice: 150000,
      minOrder: 1,
      maxOrder: 2,
    }
  },
  {
    id: 'p3',
    name: 'Zeste d\'Agrumes',
    description: 'A vibrant and refreshing citrus burst of bergamot, lemon, and neroli.',
    price: 950000,
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'citrus scent',
    properties: { 
      'Scent Profile': 'Citrus', 
      'Concentration': 'EDT',
      'Brand': 'Soleil Levant',
      'Perfumer': 'Isabelle Martin',
      'Variant': '100ml'
    },
  },
  {
    id: 'p4',
    name: 'Ambre Nuit',
    description: 'A warm and sensual amber fragrance, perfect for evening wear.',
    price: 1500000,
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'luxury perfume',
    properties: { 
      'Scent Profile': 'Oriental', 
      'Concentration': 'Parfum',
      'Brand': 'Nuit Étoilée',
      'Perfumer': 'François Dubois',
      'Variant': '50ml'
    },
  },
  {
    id: 'p5',
    name: 'Ocean Breeze',
    description: 'A crisp, clean scent with notes of sea salt, aquatic accords, and a hint of mint.',
    price: 850000,
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'ocean perfume',
    properties: {
      'Scent Profile': 'Fresh',
      'Concentration': 'EDC',
      'Brand': 'Aqua Vitae',
      'Perfumer': 'Alex Doe',
      'Variant': '120ml'
    },
    perfumerProfileSlug: 'alex-doe',
  },
  {
    id: 'p6',
    name: 'Poivre Noir',
    description: 'A bold, spicy fragrance dominated by black pepper, cloves, and a warm leather base.',
    price: 1450000,
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'spicy perfume',
    properties: {
      'Scent Profile': 'Spicy',
      'Concentration': 'EDP',
      'Brand': 'Forêt Noire Parfums',
      'Perfumer': 'Antoine Leduc',
      'Variant': '75ml'
    },
    perfumerProfileSlug: 'antoine-leduc',
  },
  // Raw Materials
  {
    id: 'rm1',
    name: 'Sandalwood Oil',
    description: 'Pure, ethically sourced sandalwood essential oil from Mysore.',
    price: 800000,
    category: 'Raw Material',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'oil bottle',
    properties: { 'Material Type': 'Essential Oil', 'Origin': 'India' },
  },
  {
    id: 'rm2',
    name: 'Iso E Super',
    description: 'A key aroma chemical known for its smooth, woody, and ambergris-like notes.',
    price: 450000,
    category: 'Raw Material',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'chemical bottle',
    properties: { 'Material Type': 'Aroma Chemical', 'Origin': 'Synthetic' },
  },
  {
    id: 'rm3',
    name: 'Bulgarian Rose Absolute',
    description: 'A highly concentrated, rich and deep rose scent from the Damask rose.',
    price: 2500000,
    category: 'Raw Material',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'rose oil',
    properties: { 'Material Type': 'Absolute', 'Origin': 'Bulgaria' },
  },
  {
    id: 'rm4',
    name: 'Oud Absolute (SAMBATAN)',
    description: 'Extremely rare and potent Oud Absolute from the forests of Borneo. Join the sambatan to acquire this precious material at an accessible price point.',
    price: 4500000,
    category: 'Raw Material',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'dark oil bottle',
    properties: { 'Material Type': 'Absolute', 'Origin': 'Indonesia' },
    sambatan: {
      isActive: true,
      targetParticipants: 15,
      currentParticipants: 4,
      deadline: oneWeekFromNow.toISOString(),
      sambatanPrice: 3250000,
      minOrder: 1,
      maxOrder: 1,
    }
  },
  // Tools
  {
    id: 't1',
    name: 'Glass Beaker Set',
    description: 'A set of 3 borosilicate glass beakers (50ml, 100ml, 250ml) for precise mixing.',
    price: 350000,
    category: 'Tools',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'lab beakers',
    properties: { 'Tool Type': 'Glassware', 'Material': 'Borosilicate Glass' },
  },
  {
    id: 't2',
    name: 'Digital Perfumer\'s Scale',
    description: 'High-precision digital scale (0.001g) for accurate material measurement.',
    price: 750000,
    category: 'Tools',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'digital scale',
    properties: { 'Tool Type': 'Measurement', 'Material': 'Stainless Steel' },
  },
  {
    id: 't3',
    name: 'Perfume Testing Strips',
    description: 'Pack of 100 professional-grade blotter strips for scent evaluation.',
    price: 150000,
    category: 'Tools',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'perfume strips',
    properties: { 'Tool Type': 'Evaluation', 'Material': 'Paper' },
  },
];

export type { Product };
