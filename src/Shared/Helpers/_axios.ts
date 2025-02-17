import axios from 'axios';
import { baseUrl } from 'Shared/Constants/constants';

export const _axios = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});
