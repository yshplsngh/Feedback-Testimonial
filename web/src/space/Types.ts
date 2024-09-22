import { z } from 'zod';

export const NewSpaceScheme = z.object({
  spaceName: z
    .string()
    .trim()
    .min(1)
    .transform((data) =>
      data
        .split(' ')
        .filter((value) => value !== '')
        .join('-'),
    ),
  websiteUrl: z.string().trim().min(1),
  headerTitle: z.string().trim().min(1),
  customMessage: z.string().trim().min(4),
  question: z.string().trim().min(1),
});

export type NewSpaceType = z.infer<typeof NewSpaceScheme>;
