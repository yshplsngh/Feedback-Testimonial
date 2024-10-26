import { z } from 'zod';

export const FeedbackSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email().trim().min(1),
  customerFeedback: z.string().trim().min(10),
  stars: z.number().min(1).max(5),
  spaceName: z.string().toLowerCase(),
});
