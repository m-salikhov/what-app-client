import { ErrorServerSchema } from 'Shared/Types/errorServer';

export const extractServerErrorMessage = (err: unknown) => {
  const { data: result, success } = ErrorServerSchema.safeParse(err);

  return success ? result.data.message : 'Ошибка сервера. Попробуйте позже.';
};
