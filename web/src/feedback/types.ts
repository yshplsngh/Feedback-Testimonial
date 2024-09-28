import { z } from 'zod';

export const FeedbackSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email().trim(),
  messageBox: z.string().trim().min(2),
});
export type FeedbackType = z.infer<typeof FeedbackSchema>;
