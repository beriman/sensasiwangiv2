'use server';
/**
 * @fileOverview An AI-powered screener for Nusantarum curation applications.
 *
 * This flow analyzes a perfumer's or brand's statement to provide an initial
 * assessment for human curators.
 */

import { ai } from '@/ai/genkit';
import { z } from 'genkit';

export const CurationScreenerInputSchema = z.object({
  statement: z
    .string()
    .min(100)
    .describe(
      'A detailed statement from the applicant covering their philosophy, creation process, and key materials.'
    ),
});
export type CurationScreenerInput = z.infer<typeof CurationScreenerInputSchema>;

export const CurationScreenerOutputSchema = z.object({
  isStrongCandidate: z
    .boolean()
    .describe(
      'Based on the statement, is this applicant a strong candidate for artisan perfumery verification?'
    ),
  summary: z
    .string()
    .describe(
      "A concise summary of the applicant's philosophy and process for the human curator."
    ),
  recommendation: z
    .string()
    .describe(
      'A recommendation for the next step (e.g., "Recommend for sample review", "Request more information on material sourcing").'
    ),
  score: z
    .number()
    .min(1)
    .max(10)
    .describe(
      'An initial screening score from 1 (very weak) to 10 (very strong candidate) based on artisan perfumery principles.'
    ),
});
export type CurationScreenerOutput = z.infer<typeof CurationScreenerOutputSchema>;

const curationScreenerPrompt = ai.definePrompt({
  name: 'curationScreenerPrompt',
  input: { schema: CurationScreenerInputSchema },
  output: { schema: CurationScreenerOutputSchema },
  prompt: `You are an expert assistant for "Nusantarum", a prestigious curation body for artisan perfumery. Your role is to conduct an initial screening of applications.

You must evaluate the applicant's statement based on the core principles of artisan perfumery: originality, hands-on creation process (not just re-bottling pre-made oils), thoughtful material selection, and a clear artistic vision.

Based on the following statement, provide an assessment. Distinguish clearly between true artisans who formulate from raw materials and those who might just be using fragrance oils or "bibit parfum". Look for keywords like "meracik dari bahan baku", "formulasi sendiri", "absolut", "minyak atsiri" as positive indicators. Be skeptical of vague language.

Applicant's Statement:
{{{statement}}}

Analyze the statement and provide your assessment in the requested JSON format. The score should reflect how closely they align with true artisan principles. A high score (8-10) is for those who clearly describe their formulation process. A low score (1-4) is for those whose language suggests using pre-made fragrance oils.`,
});

const curationScreenerFlow = ai.defineFlow(
  {
    name: 'curationScreenerFlow',
    inputSchema: CurationScreenerInputSchema,
    outputSchema: CurationScreenerOutputSchema,
  },
  async (input) => {
    const { output } = await curationScreenerPrompt(input);
    return output!;
  }
);

export async function screenCurationApplication(
  input: CurationScreenerInput
): Promise<CurationScreenerOutput> {
  return await curationScreenerFlow(input);
}
