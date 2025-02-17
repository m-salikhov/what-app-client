import { z } from 'zod';

export interface ErrorServer {
  data: { message: string; statusCode: number };
  status: number;
}
const ErrorDataSchema = z.object({
  message: z.string(),
  statusCode: z.number(),
});

export const ErrorServerSchema = z.object({
  data: ErrorDataSchema,
  status: z.number(),
});

export type ErrorServerType = z.infer<typeof ErrorServerSchema>;
