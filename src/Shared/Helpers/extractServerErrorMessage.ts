import { ErrorServerSchema } from 'Shared/Types/errorServer';

const extractServerErrorMessage = (err: unknown) => {
  const { data: result, success } = ErrorServerSchema.safeParse(err);

  return success ? result.data.message : 'Ошибка';
};

export default extractServerErrorMessage;
