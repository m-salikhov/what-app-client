import axios from "axios";

//Подключает куки и сервер
export const _axios = axios.create({
  withCredentials: true,
  baseURL: "https://andvarif.ru",
});
