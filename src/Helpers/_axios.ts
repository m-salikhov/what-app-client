import axios from "axios";

//Подключает куки и базовый URL
export const _axios = axios.create({
  withCredentials: true,
  baseURL: "https://andvarif.store/",
});
