import { z } from 'zod';

export const UserSchema = z.object({
  id: z.string().uuid(),
  email: z.string().email(),
  username: z.string(),
  role: z.enum(['user', 'superuser', 'admin']),
  date: z.number(),
});

export type UserType = z.infer<typeof UserSchema>;
