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

export const webNout = Axios.create({
  baseURL: API_URL,
});

webNout.interceptors.request.use(authRequestInterceptor);
