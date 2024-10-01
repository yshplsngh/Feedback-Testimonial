import { z } from 'zod';

export const FeedbackSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email().trim().min(1),
  customerFeedback: z.string().trim().min(10),
});
export type FeedbackType = z.infer<typeof FeedbackSchema>;
