'use server';
/**
 * @fileOverview A flow for generating product images using AI.
 *
 * This file defines a Genkit flow for generating a product image based on its
 * name and description.
 *
 * THIS FEATURE IS DEPRECATED AND SHOULD NOT BE USED.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

const GenerateProductImageInputSchema = z.object({
  name: z.string().describe('The name of the product.'),
  description: z.string().describe('The description of the product.'),
});
export type GenerateProductImageInput = z.infer<typeof GenerateProductImageInputSchema>;

const GenerateProductImageOutputSchema = z.object({
  imageUrl: z
    .string()
    .describe(
      "The generated image as a data URI that must include a MIME type and use Base64 encoding. Expected format: 'data:<mimetype>;base64,<encoded_data>'."
    ),
});
export type GenerateProductImageOutput = z.infer<typeof GenerateProductImageOutputSchema>;

export async function generateProductImage(input: GenerateProductImageInput): Promise<GenerateProductImageOutput> {
    // This feature is deprecated. Throw an error.
    throw new Error('AI Image Generation is disabled. Please use the manual upload feature.');
}
