import { z } from 'zod';
import { TournamentShortTypeSchema } from './TournamentSchema';

// Схема для SourceType
const SourceTypeSchema = z.object({
  id: z.number(),
  link: z.string(),
});

export const QuestionTypeSchema = z.object({
  id: z.number(),
  type: z.enum(['regular', 'double', 'triple', 'other', 'outside']),
  qNumber: z.number(),
  tourNumber: z.number(),
  add: z.string().optional(),
  text: z.string(),
  answer: z.string(),
  alterAnswer: z.string().optional(),
  comment: z.string().optional(),
  source: z.array(SourceTypeSchema).optional(),
  author: z.string(),
  tournament: TournamentShortTypeSchema.optional(),
});

export type QuestionType = z.infer<typeof QuestionTypeSchema>;
