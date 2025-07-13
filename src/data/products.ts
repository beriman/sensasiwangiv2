import type { Product } from '@/lib/types';

const oneWeekFromNow = new Date();
oneWeekFromNow.setDate(oneWeekFromNow.getDate() + 7);

export const products: Product[] = [
  // Parfum
  {
    id: 'p1',
    name: 'Eau de Lumière',
    description: 'A radiant floral fragrance with notes of jasmine, tuberose, and a hint of citrus.',
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'perfume bottle',
    properties: { 
      'Scent Profile': 'Floral', 
      'Concentration': 'EDP',
      'Brand': 'Maison de Rêve',
      'Perfumer': 'Alex Doe',
    },
    perfumerProfileSlug: 'maison-de-reve', // Sold by the brand profile
    isListed: true,
    variants: [
      { id: 'p1-50', name: '50ml', price: 1200000, stock: 15 },
      { id: 'p1-100', name: '100ml', price: 1800000, stock: 8 },
    ]
  },
  {
    id: 'p2',
    name: 'Boisé Mystique (Bagi Sambatan Vial)',
    description: 'An enchanting woody scent. Join our group buy to get a vial decant at a special price! The seller will purchase a full bottle and share it into smaller vials.',
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'elegant perfume',
    properties: { 
      'Scent Profile': 'Woody', 
      'Concentration': 'EDP',
      'Brand': 'Forêt Noire Parfums',
      'Perfumer': 'Antoine Leduc',
    },
    perfumerProfileSlug: 'foret-noire-parfums',
    isListed: true,
    variants: [{ id: 'p2-vial', name: '10ml Vial', price: 1350000, stock: 1 }], // Price here is original price, sambatan price is separate
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
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'citrus scent',
    properties: { 
      'Scent Profile': 'Citrus', 
      'Concentration': 'EDT',
      'Brand': 'Maison de Rêve',
      'Perfumer': 'Isabelle Martin',
    },
    perfumerProfileSlug: 'maison-de-reve',
    isListed: true,
    variants: [
      { id: 'p3-100', name: '100ml', price: 950000, stock: 25 },
    ]
  },
  {
    id: 'p4',
    name: 'Ambre Nuit',
    description: 'A warm and sensual amber fragrance, perfect for evening wear.',
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'luxury perfume',
    properties: { 
      'Scent Profile': 'Oriental', 
      'Concentration': 'Parfum',
      'Brand': 'Nuit Étoilée',
      'Perfumer': 'François Dubois',
    },
    perfumerProfileSlug: 'foret-noire-parfums',
    isListed: true,
    variants: [
      { id: 'p4-50', name: '50ml', price: 1500000, stock: 0 },
    ]
  },
  {
    id: 'p5',
    name: 'Ocean Breeze',
    description: 'A crisp, clean scent with notes of sea salt, aquatic accords, and a hint of mint.',
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'ocean perfume',
    properties: {
      'Scent Profile': 'Fresh',
      'Concentration': 'EDC',
      'Brand': 'Aqua Vitae',
      'Perfumer': 'Alex Doe',
    },
    perfumerProfileSlug: 'alex-doe',
    isListed: false,
    variants: [
      { id: 'p5-120', name: '120ml', price: 850000, stock: 30 },
    ]
  },
  {
    id: 'p6',
    name: 'Poivre Noir',
    description: 'A bold, spicy fragrance dominated by black pepper, cloves, and a warm leather base.',
    category: 'Parfum',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'spicy perfume',
    properties: {
      'Scent Profile': 'Spicy',
      'Concentration': 'EDP',
      'Brand': 'Forêt Noire Parfums',
      'Perfumer': 'Antoine Leduc',
    },
    perfumerProfileSlug: 'antoine-leduc',
    isListed: true,
    variants: [
      { id: 'p6-75', name: '75ml', price: 1450000, stock: 12 },
    ]
  },
  // Raw Materials
  {
    id: 'rm1',
    name: 'Sandalwood Oil',
    description: 'Pure, ethically sourced sandalwood essential oil from Mysore.',
    category: 'Raw Material',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'oil bottle',
    properties: { 'Material Type': 'Essential Oil', 'Origin': 'India' },
    isListed: true,
    perfumerProfileSlug: 'alex-doe',
    variants: [
      { id: 'rm1-10', name: '10g', price: 800000, stock: 50 },
      { id: 'rm1-50', name: '50g', price: 3500000, stock: 10 },
    ]
  },
  {
    id: 'rm2',
    name: 'Iso E Super',
    description: 'A key aroma chemical known for its smooth, woody, and ambergris-like notes.',
    category: 'Raw Material',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'chemical bottle',
    properties: { 'Material Type': 'Aroma Chemical', 'Origin': 'Synthetic' },
    isListed: true,
    perfumerProfileSlug: 'antoine-leduc',
    variants: [
      { id: 'rm2-50', name: '50g', price: 450000, stock: 100 },
    ]
  },
  {
    id: 'rm3',
    name: 'Bulgarian Rose Absolute',
    description: 'A highly concentrated, rich and deep rose scent from the Damask rose.',
    category: 'Raw Material',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'rose oil',
    properties: { 'Material Type': 'Absolute', 'Origin': 'Bulgaria' },
    isListed: true,
    perfumerProfileSlug: 'alex-doe',
    variants: [
      { id: 'rm3-5', name: '5g', price: 2500000, stock: 5 },
    ]
  },
  {
    id: 'rm4',
    name: 'Oud Absolute (SAMBATAN)',
    description: 'Extremely rare and potent Oud Absolute from the forests of Borneo. Join the sambatan to acquire this precious material at an accessible price point.',
    category: 'Raw Material',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'dark oil bottle',
    properties: { 'Material Type': 'Absolute', 'Origin': 'Indonesia' },
    isListed: true,
    perfumerProfileSlug: 'antoine-leduc',
    variants: [{ id: 'rm4-1ml', name: '1ml Decant', price: 4500000, stock: 1 }],
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
    category: 'Tools',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'lab beakers',
    properties: { 'Tool Type': 'Glassware', 'Material': 'Borosilicate Glass' },
    isListed: true,
    perfumerProfileSlug: 'alex-doe',
    variants: [{ id: 't1-set', name: 'Set of 3', price: 350000, stock: 40 }]
  },
  {
    id: 't2',
    name: 'Digital Perfumer\'s Scale',
    description: 'High-precision digital scale (0.001g) for accurate material measurement.',
    category: 'Tools',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'digital scale',
    properties: { 'Tool Type': 'Measurement', 'Material': 'Stainless Steel' },
    isListed: true,
    perfumerProfileSlug: 'antoine-leduc',
    variants: [{ id: 't2-scale', name: 'Single Scale', price: 750000, stock: 20 }]
  },
  {
    id: 't3',
    name: 'Perfume Testing Strips',
    description: 'Pack of 100 professional-grade blotter strips for scent evaluation.',
    category: 'Tools',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'perfume strips',
    properties: { 'Tool Type': 'Evaluation', 'Material': 'Paper' },
    isListed: true,
    perfumerProfileSlug: 'alex-doe',
    variants: [{ id: 't3-pack', name: 'Pack of 100', price: 150000, stock: 200 }]
  },
  // Services
  {
    id: 'svc1',
    name: 'Jasa Lukis Botol Parfum',
    description: 'Ubah botol parfum Anda menjadi sebuah karya seni. Saya akan melukis desain kustom pada botol Anda. Alur: Anda mengirim botol -> Saya melukis -> Saya mengirim kembali botol yang sudah jadi.',
    category: 'Jasa',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'painted bottle art',
    properties: { 'Jenis Layanan': 'Kustomisasi Artistik', 'Waktu Pengerjaan': '5-7 hari kerja' },
    isListed: true,
    perfumerProfileSlug: 'maison-de-reve', // Service offered by a curated brand
    variants: [{ id: 'svc1-bottle', name: 'Per Botol', price: 300000, stock: 100 }] // Stock can represent capacity
  },
  // Misc
  {
    id: 'm3',
    name: 'Premium Member Tier Upgrade',
    description: 'Upgrade to a Premium Member for one year. Get early access to new products, exclusive discounts, and a special badge on your profile.',
    category: 'Misc',
    imageUrl: 'https://placehold.co/600x600.png',
    imageHint: 'membership card',
    properties: { 'Product Type': 'Subscription' },
    isListed: true,
    perfumerProfileSlug: 'alex-doe',
    variants: [{ id: 'm3-1y', name: '1 Year', price: 500000, stock: 9999 }]
  },
];

export type { Product };
