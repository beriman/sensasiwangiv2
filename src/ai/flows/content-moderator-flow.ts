'use server';
/**
 * @fileOverview An AI-powered content moderation system.
 * This flow analyzes user-generated text to detect potential policy violations
 * such as hate speech, spam, sexual content, and more, providing a moderation
 * decision.
 */

import { ai } from '@/ai/genkit';
import { z } from 'zod';

// Define the categories of harmful content we want to detect.
const HarmfulCategorySchema = z.enum([
  'HATE_SPEECH',
  'DISCRIMINATION',
  'ADULT_SEXUAL_CONTENT',
  'VIOLENCE_THREATS',
  'SPAM_PROMOTION',
  'FRAUD_PHISHING',
  'PERSONAL_IDENTIFIABLE_INFORMATION',
  'OTHER_VIOLATION',
]);
type HarmfulCategory = z.infer<typeof HarmfulCategorySchema>;

// Input schema for the moderation flow.
export const ContentModeratorInputSchema = z.object({
  content: z.string().describe('The user-generated text content to be analyzed.'),
});
export type ContentModeratorInput = z.infer<typeof ContentModeratorInputSchema>;

// Output schema defining the moderation result.
export const ContentModeratorOutputSchema = z.object({
  decision: z
    .enum(['ALLOW', 'FLAG', 'BLOCK'])
    .describe(
      'The final decision. ALLOW: Content is safe. FLAG: Content is suspicious and needs human review. BLOCK: Content clearly violates policy.'
    ),
  reason: z
    .string()
    .describe(
      'A brief explanation for the decision, especially for FLAG or BLOCK.'
    ),
  flaggedCategories: z
    .array(
      z.object({
        category: HarmfulCategorySchema,
        probability: z
          .number()
          .min(0)
          .max(1)
          .describe('The probability score (0 to 1) for this category.'),
      })
    )
    .describe('A list of categories that were flagged with their scores.'),
});
export type ContentModeratorOutput = z.infer<
  typeof ContentModeratorOutputSchema
>;

/**
 * An exported wrapper function to call the content moderator flow.
 * @param {ContentModeratorInput} input - The content to be moderated.
 * @returns {Promise<ContentModeratorOutput>} - The moderation decision.
 */
export async function moderateContent(
  input: ContentModeratorInput
): Promise<ContentModeratorOutput> {
  return contentModeratorFlow(input);
}

const moderatorPrompt = ai.definePrompt({
  name: 'contentModeratorPrompt',
  input: { schema: ContentModeratorInputSchema },
  output: { schema: ContentModeratorOutputSchema },
  prompt: `You are an expert content moderator for an online marketplace called "SensasiWangi.id", a platform for perfume enthusiasts. Your primary goal is to ensure the community remains safe, positive, and inclusive.

Analyze the following user-generated content based on these categories:
- HATE_SPEECH: Attacks or demeans a group based on race, ethnicity, religion, gender, etc.
- DISCRIMINATION: Unfair treatment or prejudice against individuals or groups.
- ADULT_SEXUAL_CONTENT: Explicitly sexual or pornographic material.
- VIOLENCE_THREATS: Threats of harm against individuals or groups.
- SPAM_PROMOTION: Unsolicited advertising, excessive promotion of other sites/products.
- FRAUD_PHISHING: Attempts to deceive users for financial gain or to steal information.
- PERSONAL_IDENTIFIABLE_INFORMATION: Sharing private info like phone numbers, addresses, financial details.
- OTHER_VIOLATION: Other general violations like harassment, bullying, or illegal activities.

Based on your analysis of the content, provide a structured JSON output with your decision:
1.  **decision**:
    - "ALLOW": If the content is clearly safe and does not violate any policies.
    - "FLAG": If the content is borderline, ambiguous, or contains sensitive topics that require a human moderator's review. Use this for subtle cases.
    - "BLOCK": If the content is a clear and severe violation of our policies (e.g., explicit hate speech, obvious spam, threats).
2.  **reason**: Briefly explain your decision. If ALLOW, state "Content appears safe."
3.  **flaggedCategories**: List ALL categories that you find problematic, along with a probability score from 0.0 (not present) to 1.0 (definitely present) for each. If the content is safe, this can be an empty array.

User-Generated Content:
\`\`\`
{{{content}}}
\`\`\`

Provide your analysis in the required JSON format.
`,
});

const contentModeratorFlow = ai.defineFlow(
  {
    name: 'contentModeratorFlow',
    inputSchema: ContentModeratorInputSchema,
    outputSchema: ContentModeratorOutputSchema,
  },
  async (input) => {
    // In a real-world scenario, you might add a blacklist check here first.
    // For now, we rely on the AI.

    const { output } = await moderatorPrompt(input);
    if (!output) {
      throw new Error('AI failed to provide a moderation decision.');
    }
    return output;
  }
);
