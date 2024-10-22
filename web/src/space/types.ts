import { z } from 'zod';

const urlPattern = new RegExp(
  '^(https?:\\/\\/)?' +
    '((([a-z\\d]([a-z\\d-]*[a-z\\d])*)\\.)+[a-z]{2,}|' +
    '((\\d{1,3}\\.){3}\\d{1,3}))' +
    '(\\:\\d+)?(\\/[-a-z\\d%_.~+]*)*' +
    '(\\?[;&a-z\\d%_.~+=-]*)?' +
    '(\\#[-a-z\\d_]*)?$',
  'i',
);

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
  websiteUrl: z.string().trim().min(1).regex(urlPattern, 'Invalid URL format'),
  customMessage: z.string().trim().min(4),
  question: z.string().trim().min(1),
});

export type NewSpaceType = z.infer<typeof NewSpaceScheme>;

export const EditedSpaceWithIdSchema = NewSpaceScheme.extend({
  id: z.number().int().positive(),
});

export type EditedSpaceWithIdType = z.infer<typeof EditedSpaceWithIdSchema>;

export interface BNewSpacesType {
  id: number;
  userId: number;
  spaceName: string;
  websiteUrl: string;
  customMessage: string;
  feedbackCount: number;
  question: string;
  createdAt: string;
  updatedAt: string;
}
