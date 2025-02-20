import { z } from 'zod';
import { QuestionTypeSchema } from './QuestionSchema';

// Схема для EditorType
const EditorTypeSchema = z.object({
  name: z.string(),
  id: z.number(),
});

export const TournamentShortTypeSchema = z.object({
  id: z.number(),
  title: z.string(),
  date: z.number(),
  tours: z.number(),
  questionsQuantity: z.number(),
  uploader: z.string(),
  dateUpload: z.number(),
  uploaderUuid: z.string(),
  link: z.string().url(),
});

export const TournamentTypeSchema = TournamentShortTypeSchema.extend({
  questions: z.array(QuestionTypeSchema),
  editors: z.array(EditorTypeSchema),
});

export type TournamentShortType = z.infer<typeof TournamentShortTypeSchema>;
export type TournamentType = z.infer<typeof TournamentTypeSchema>;
