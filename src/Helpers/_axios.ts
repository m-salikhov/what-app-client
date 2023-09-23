import axios from "axios";

export const _axios = axios.create({
  withCredentials: true,
  baseURL: "https://andvarif.store/",
});
