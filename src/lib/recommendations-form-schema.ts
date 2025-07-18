import { z } from 'zod';

export const recommendationsFormSchema = z.object({
  preferences: z.string().min(10, {
    message: 'Please describe your preferences in at least 10 characters.',
  }),
});
