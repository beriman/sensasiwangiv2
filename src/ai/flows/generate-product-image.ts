'use server';
/**
 * @fileOverview A flow for generating product images using AI.
 *
 * This file defines a Genkit flow for generating a product image based on its
 * name and description.
 *
 * @interface GenerateProductImageInput - Defines the input schema for the image generation flow.
 * @interface GenerateProductImageOutput - Defines the output schema for the image generation flow.
 * @function generateProductImage - A wrapper function to trigger the image generation flow.
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
    return generateProductImageFlow(input);
}

const generateProductImageFlow = ai.defineFlow(
    {
      name: 'generateProductImageFlow',
      inputSchema: GenerateProductImageInputSchema,
      outputSchema: GenerateProductImageOutputSchema,
    },
    async (input) => {
      const { media } = await ai.generate({
        model: 'googleai/gemini-2.0-flash-preview-image-generation',
        prompt: `Generate a professional, high-quality e-commerce product photo for a perfume product named "${input.name}".

        Description: "${input.description}".

        The image should be clean, well-lit, and suitable for a luxury brand's online store. Show the perfume bottle attractively, perhaps with subtle props or background elements that match the scent's description. The bottle should be the main focus.
        `,
        config: {
          responseModalities: ['TEXT', 'IMAGE'],
        },
      });
  
      if (!media?.url) {
        throw new Error('Image generation failed to return an image.');
      }
  
      return { imageUrl: media.url };
    }
);
