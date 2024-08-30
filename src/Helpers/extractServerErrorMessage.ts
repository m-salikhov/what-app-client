import { SerializedError } from '@reduxjs/toolkit';
import { ErrorServer } from '../Types/errorServer';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';

const extractServerErrorMessage = (
  err: SerializedError | FetchBaseQueryError | undefined
) => {
  if (typeof err === 'undefined') {
    return '';
  }

  const e = err as ErrorServer;
  return e.data?.message || 'Ошибка';
};

export default extractServerErrorMessage;
