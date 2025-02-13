import { z } from 'zod';

export const registrationSchema = z
  .object({
    email: z.string().email('Неверный формат почты'),
    username: z
      .string()
      .min(3, 'Логин должен содержать минимум 3 символа')
      .max(20, 'Логин должен содержать максимум 20 символов'),
    password: z
      .string()
      .min(4, 'Пароль должен содержать минимум 4 символа')
      .max(20, 'Пароль должен содержать максимум 20 символов'),
    confirmPassword: z.string(),
  })
  .refine(
    (values) => {
      return values.password === values.confirmPassword;
    },
    {
      message: 'Passwords must match!',
      path: ['confirmPassword'],
    }
  );

export type RegistrationType = z.infer<typeof registrationSchema>;

export const loginSchema = z.object({
  email: z.string().email('Неверный формат почты'),
  password: z
    .string()
    .min(4, 'Пароль должен содержать минимум 4 символа')
    .max(20, 'Пароль должен содержать максимум 20 символов'),
});

export type LoginType = z.infer<typeof loginSchema>;
