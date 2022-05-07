import Axios, { AxiosRequestConfig } from 'axios';
import { storage } from '~/utils/storage';
import { API_URL } from '~/config';

function authRequestInterceptor(config: AxiosRequestConfig) {
  const token = storage.getToken();

  if (config.headers === undefined) config.headers = {};

  if (token) config.headers.Authorization = `Bearer ${token}`;
  config.headers.Accept = 'application/json';

  return config;
}

export const axios = Axios.create({
  baseURL: API_URL,
});

axios.interceptors.request.use(authRequestInterceptor);
