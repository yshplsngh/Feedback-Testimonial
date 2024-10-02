import { z } from 'zod';

export const FeedbackSchema = z.object({
  name: z.string().trim().min(1),
  email: z.string().email().trim().min(1),
  customerFeedback: z.string().trim().min(10),
});

export const StarAndSpaceNameSchema = z.object({
  stars: z.number().min(1).max(5),
  spaceName: z.string(),
});

export const CombinedSchema = FeedbackSchema.merge(StarAndSpaceNameSchema);

export type FeedbackType = z.infer<typeof FeedbackSchema>;
export type FeedbackTypeWSS = z.infer<typeof CombinedSchema>;
