const apiBaseUrl = import.meta.env.DEV
  ? '/api'
  : import.meta.env.VITE_API_BASE_URL || 'http://localhost:8080/api';

export const env = Object.freeze({
  apiBaseUrl: apiBaseUrl.replace(/\/+$/, ''),
  authServerOrigin: import.meta.env.VITE_AUTH_SERVER_ORIGIN || 'http://127.0.0.1:8010',
  isDevelopment: import.meta.env.DEV,
});
