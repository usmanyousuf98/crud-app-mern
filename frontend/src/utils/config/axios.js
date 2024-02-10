import axios, { Axios } from "axios";

export const instanceAuth = axios.create({
  baseURL: process.env.REACT_APP_BASE_URL, //dev url
});
instanceAuth.interceptors.response.use(
  function (response) {
    return response.data;
  },
  function (error) {
    return Promise.reject(error);
  }
);
