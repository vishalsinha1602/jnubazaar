import axios from 'axios';
import { env } from '@/shared/config/env';
import { configureInterceptors } from '@/shared/api/interceptors';

export const buildApiUrl = (endpoint) => {
  const path = endpoint.startsWith('/') ? endpoint : `/${endpoint}`;
  return new URL(`${env.apiBaseUrl}${path}`, window.location.origin).toString();
};

const http = axios.create({
  baseURL: env.apiBaseUrl,
  headers: {
    Accept: 'application/json',
    'Content-Type': 'application/json',
  },
  timeout: 10000,
  paramsSerializer: {
    serialize(params) {
      const query = new URLSearchParams();
      Object.entries(params || {}).forEach(([key, value]) => {
        if (value === undefined || value === null || value === '') return;
        (Array.isArray(value) ? value : [value]).forEach((item) => {
          if (item !== undefined && item !== null && item !== '') query.append(key, String(item));
        });
      });
      return query.toString();
    },
  },
});

configureInterceptors(http);

export const axiosClient = http;
export default axiosClient;
