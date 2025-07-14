// src/data/curation-applications.ts

export type CurationStatus = 
    | 'Pending AI Review'
    | 'Pending Sample Review'
    | 'Approved'
    | 'Rejected'
    | 'More Info Required';

export interface CurationApplication {
    id: string;
    applicantName: string;
    applicantSlug: string;
    dateApplied: string; // ISO 8601
    status: CurationStatus;
    aiScore: number;
    statement: string;
    lastUpdatedBy?: string;
    rejectionReason?: string;
}

export const curationApplications: CurationApplication[] = [
    {
        id: 'app-001',
        applicantName: 'Forêt Noire Parfums',
        applicantSlug: 'foret-noire-parfums',
        dateApplied: new Date('2024-05-28T10:00:00Z').toISOString(),
        status: 'Pending Sample Review',
        aiScore: 9,
        statement: 'Our philosophy at Forêt Noire is to capture the essence of deep, ancient forests. We formulate everything in-house using raw materials like oakmoss absolute, vetiver essential oil, and our own tincture of local resins. We never use pre-made fragrance oils.',
        lastUpdatedBy: 'Curator AI',
    },
    {
        id: 'app-002',
        applicantName: 'Wangi Kilat',
        applicantSlug: 'wangi-kilat',
        dateApplied: new Date('2024-05-27T14:30:00Z').toISOString(),
        status: 'Rejected',
        aiScore: 2,
        statement: 'Kami menyediakan bibit parfum import kualitas terbaik. Wanginya tahan lama dan mirip dengan parfum desainer ternama. Proses kami adalah mencampur bibit dengan pelarut khusus untuk hasil terbaik.',
        lastUpdatedBy: 'Curator B',
        rejectionReason: 'The statement clearly indicates the use of pre-made fragrance oils ("bibit parfum"), which does not align with our standards for original, artisan creation. We require perfumers to formulate from individual raw materials.'
    },
    {
        id: 'app-003',
        applicantName: 'Aroma Pribumi',
        applicantSlug: 'aroma-pribumi',
        dateApplied: new Date('2024-05-25T09:00:00Z').toISOString(),
        status: 'Approved',
        aiScore: 8,
        statement: 'Aroma Pribumi mengangkat kekayaan flora Indonesia. Setiap parfum diracik dari nol menggunakan minyak atsiri pala dari Maluku, nilam dari Aceh, dan melati dari Jawa. Proses kami sangat mengandalkan maserasi dan distilasi uap tradisional.',
        lastUpdatedBy: 'Curator A',
    },
    {
        id: 'app-004',
        applicantName: 'Scent Solutions',
        applicantSlug: 'scent-solutions',
        dateApplied: new Date('2024-05-29T11:00:00Z').toISOString(),
        status: 'Pending AI Review',
        aiScore: 0, // Score not yet assigned
        statement: 'We provide high-quality fragrance experiences for our customers.'
    },
];
