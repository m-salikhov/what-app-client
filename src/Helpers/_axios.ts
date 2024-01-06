import axios from 'axios';
import { baseUrl } from '../constants';

export const _axios = axios.create({
  withCredentials: true,
  baseURL: baseUrl,
});
