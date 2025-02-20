import { z } from 'zod';

export const ResultElementSchema = z.object({
  id: z.number(),
  tour: z.number(),
  num: z.number(),
  ans: z.boolean(),
});

export const ResultSchema = z.object({
  id: z.string().uuid(),
  userId: z.string().uuid(),
  date: z.number(),
  tournamentId: z.number(),
  title: z.string(),
  tournamentLength: z.number(),
  resultNumber: z.number(),
});

export const ResultFullSchema = ResultSchema.extend({
  result: z.array(ResultElementSchema),
});

//когда результат еще не сохранен.
export const ResultElementClientSchema = ResultElementSchema.omit({
  id: true,
});

export type ResultFullType = z.infer<typeof ResultFullSchema>;
export type ResultType = z.infer<typeof ResultSchema>;
export type ResultElementType = z.infer<typeof ResultElementSchema>;
export type ResultElementClientType = z.infer<typeof ResultElementClientSchema>;
