import { SerializedError } from "@reduxjs/toolkit";
import { FetchBaseQueryError } from "@reduxjs/toolkit/dist/query";
import { ErrorServer } from "../Types/errorServer";

const extractServerErrorMessage = (
  err: SerializedError | FetchBaseQueryError | undefined
) => {
  const e = err as ErrorServer;
  return e.data.message || "Ошибка";
};

export default extractServerErrorMessage;
