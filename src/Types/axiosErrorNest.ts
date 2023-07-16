import { AxiosError } from "axios";

export type AxiosErrorNest = AxiosError<{
  message: string;
  error: string;
  statusCode: number;
}>;
