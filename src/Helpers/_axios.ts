import axios from "axios";
import { baseURL } from "../constants";

export const _axios = axios.create({
  withCredentials: true,
  baseURL: baseURL,
});
