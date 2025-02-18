import { z } from 'zod';

export const ResultSchema = z.object({
  id: z.string().uuid(),
  userId: z.string(),
  date: z.number(),
  tournamentId: z.number(),
  title: z.string(),
  tournamentLength: z.number(),
  resultNumber: z.number(),
});

// Выведите тип из схемы
export type ResultType = z.infer<typeof ResultSchema>;

export const ResultElementSchema = z.object({
  num: z.number(),
  ans: z.boolean(),
});

export type ResultElementType = z.infer<typeof ResultElementSchema>;

export const ResultFullSchema = ResultSchema.extend({
  result: z.array(ResultElementSchema),
});

export type ResultFullType = z.infer<typeof ResultFullSchema>;
