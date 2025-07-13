import { config } from 'dotenv';
config();

import '@/ai/flows/personalized-recommendations.ts';
import '@/ai/flows/generate-product-image.ts';
import '@/ai/flows/curation-screener.ts';
import '@/ai/flows/content-moderator-flow.ts';
