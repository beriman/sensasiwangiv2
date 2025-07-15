// src/data/reviews.ts

export interface Review {
    id: string;
    sellerSlug: string;
    reviewerName: string;
    reviewerImage: string;
    rating: number; // 1-5
    comment: string;
    date: string; // ISO 8601
  }
  
  export const reviews: Review[] = [
    {
      id: 'rev-001',
      sellerSlug: 'maison-de-reve',
      reviewerName: 'Budi Hartono',
      reviewerImage: 'https://placehold.co/40x40.png?text=BH',
      rating: 5,
      comment: 'Pelayanan sangat memuaskan! Produk Eau de Lumière tiba dengan cepat dan dibungkus dengan sangat aman. Wanginya persis seperti yang dideskripsikan, sangat mewah. Terima kasih, Maison de Rêve!',
      date: '2024-05-28T10:00:00Z',
    },
    {
      id: 'rev-002',
      sellerSlug: 'antoine-leduc',
      reviewerName: 'Citra Lestari',
      reviewerImage: 'https://placehold.co/40x40.png?text=CL',
      rating: 4,
      comment: 'Sandalwood oil-nya berkualitas tinggi. Namun, pengirimannya sedikit lebih lama dari yang diperkirakan. Secara keseluruhan, tetap puas dengan produknya.',
      date: '2024-05-25T14:30:00Z',
    },
    {
      id: 'rev-003',
      sellerSlug: 'alex-doe',
      reviewerName: 'Dewi Anggraini',
      reviewerImage: 'https://placehold.co/40x40.png?text=DA',
      rating: 5,
      comment: 'Timbangan digitalnya sangat akurat dan mudah digunakan. Penjual sangat responsif dan membantu menjawab pertanyaan saya sebelum membeli. Sangat direkomendasikan!',
      date: '2024-05-22T09:00:00Z',
    },
    {
      id: 'rev-004',
      sellerSlug: 'maison-de-reve',
      reviewerName: 'Eka Wijaya',
      reviewerImage: 'https://placehold.co/40x40.png?text=EW',
      rating: 5,
      comment: 'Zeste d\'Agrumes adalah parfum citrus terbaik yang pernah saya coba. Sangat segar dan tahan lama. Penjual juga memberikan beberapa sampel gratis. Pengalaman belanja yang luar biasa.',
      date: '2024-05-29T11:00:00Z',
    },
  ];
  