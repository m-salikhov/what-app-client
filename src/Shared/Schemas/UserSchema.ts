import { z } from 'zod';

export const UserSchema = z
  .object({
    id: z.uuid(),
    email: z.email(),
    username: z.string(),
    role: z.enum(['user', 'admin']),
    date: z.number(),
  })
  .strict();

export type UserType = z.infer<typeof UserSchema>;
