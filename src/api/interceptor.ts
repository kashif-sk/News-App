import axios, {
  AxiosError,
  AxiosResponse,
  InternalAxiosRequestConfig,
} from 'axios';
import {apiToken} from '../config';

const baseURL = 'https://newsapi.org/v2';

const AxiosRequestInterceptor = async (config: InternalAxiosRequestConfig) => {
  config.headers.set('X-Api-Key', apiToken);
  return config;
};

const AxiosResponseInterceptor = {
  result(response: AxiosResponse) {
    return response;
  },

  error(errorResponse: AxiosError) {
    return Promise.reject(errorResponse);
  },
};

axios.defaults.timeout = 60000;
axios.defaults.baseURL = baseURL;
axios.interceptors.request.use(AxiosRequestInterceptor);
axios.interceptors.response.use(
  AxiosResponseInterceptor.result,
  AxiosResponseInterceptor.error,
);
