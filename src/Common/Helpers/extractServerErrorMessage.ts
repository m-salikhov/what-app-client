import { SerializedError } from '@reduxjs/toolkit';
import { FetchBaseQueryError } from '@reduxjs/toolkit/query';
import { ErrorServer } from 'Common/Types/errorServer';

const extractServerErrorMessage = (err: SerializedError | FetchBaseQueryError | undefined) => {
  if (typeof err === 'undefined') {
    return '';
  }

  const e = err as ErrorServer;
  return e.data?.message || 'Ошибка';
};

export default extractServerErrorMessage;
