import axios from "axios";
import { baseServerURL } from "../constants";

export const _axios = axios.create({
  withCredentials: true,
  baseURL: baseServerURL,
});
