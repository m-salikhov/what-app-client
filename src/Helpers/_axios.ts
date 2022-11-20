import axios from "axios";

//Подключает куки и сервер
export const _axios = axios.create({
  withCredentials: true,
  baseURL: "https://62.217.179.200:5000",
});
