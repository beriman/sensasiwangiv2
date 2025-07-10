// src/ai/flows/personalized-recommendations.ts
'use server';

/**
 * @fileOverview Personalized product recommendations based on browsing history and preferences.
 *
 * This file defines a Genkit flow for providing personalized product recommendations
 * based on user's browsing history and preferences.
 *
 * @interface PersonalizedRecommendationsInput - Defines the input schema for the personalized recommendations flow.
 * @interface PersonalizedRecommendationsOutput - Defines the output schema for the personalized recommendations flow.
 * @function getPersonalizedRecommendations - A wrapper function to trigger the personalized recommendations flow.
 */

import {ai} from '@/ai/genkit';
import {z} from 'genkit';

/**
 * @interface PersonalizedRecommendationsInput
 * @property {string} browsingHistory - A string containing the user's browsing history.
 * @property {string} preferences - A string containing the user's product preferences.
 */
const PersonalizedRecommendationsInputSchema = z.object({
  browsingHistory: z.string().describe('The user browsing history.'),
  preferences: z.string().describe('The user product preferences.'),
});
export type PersonalizedRecommendationsInput = z.infer<typeof PersonalizedRecommendationsInputSchema>;

/**
 * @interface PersonalizedRecommendationsOutput
 * @property {string[]} recommendations - An array of product recommendations.
 */
const PersonalizedRecommendationsOutputSchema = z.object({
  recommendations: z.array(z.string()).describe('An array of product recommendations.'),
});
export type PersonalizedRecommendationsOutput = z.infer<typeof PersonalizedRecommendationsOutputSchema>;

/**
 * A wrapper function to trigger the personalized recommendations flow.
 * @param {PersonalizedRecommendationsInput} input - The input for the personalized recommendations flow.
 * @returns {Promise<PersonalizedRecommendationsOutput>} - A promise that resolves to the personalized product recommendations.
 */
export async function getPersonalizedRecommendations(input: PersonalizedRecommendationsInput): Promise<PersonalizedRecommendationsOutput> {
  return personalizedRecommendationsFlow(input);
}

const personalizedRecommendationsPrompt = ai.definePrompt({
  name: 'personalizedRecommendationsPrompt',
  input: {schema: PersonalizedRecommendationsInputSchema},
  output: {schema: PersonalizedRecommendationsOutputSchema},
  prompt: `You are a recommendation system that suggests products to users based on their browsing history and preferences.

  Based on the following browsing history: {{{browsingHistory}}}
  And these preferences: {{{preferences}}}

  Recommend a list of products that the user might be interested in. Return the recommendations as a JSON array of strings.
  Make sure the products are related to perfumes, raw materials, or tools for creating scents.
  `,
});

const personalizedRecommendationsFlow = ai.defineFlow(
  {
    name: 'personalizedRecommendationsFlow',
    inputSchema: PersonalizedRecommendationsInputSchema,
    outputSchema: PersonalizedRecommendationsOutputSchema,
  },
  async input => {
    const {output} = await personalizedRecommendationsPrompt(input);
    return output!;
  }
);
