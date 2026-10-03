import { API_ENDPOINTS } from '@/shared/api/apiEndpoints';
import {
  clearTokens,
  getAccessToken,
  getRefreshToken,
  saveAccessToken,
} from '@/features/auth/utils/tokenService';

const toApiError = (axiosError) => {
  const error = new Error(
    axiosError.response?.data?.message ||
    axiosError.response?.data?.detail ||
    axiosError.message ||
    'Request failed',
  );
  error.status = axiosError.response?.status;
  error.payload = axiosError.response?.data;
  error.cause = axiosError;
  return error;
};

export function configureInterceptors(client) {
  client.interceptors.request.use((config) => {
    const token = getAccessToken();
    if (token) config.headers.Authorization = `Bearer ${token}`;
    if (config.credentials === 'include') config.withCredentials = true;
    delete config.credentials;
    return config;
  });

  client.interceptors.response.use(
    (response) => response,
    async (axiosError) => {
      const request = axiosError.config;
      const isRefreshRequest = request?.url?.includes(API_ENDPOINTS.auth.refresh);
      const refreshToken = getRefreshToken();

      if (axiosError.response?.status === 401 && request && !request._retry && !isRefreshRequest && refreshToken) {
        request._retry = true;
        try {
          const { data: response } = await client.post(
            API_ENDPOINTS.auth.refresh,
            { refreshToken },
            { withCredentials: true },
          );
          const payload = response?.data ?? response;
          if (!payload?.accessToken) throw new Error('Token refresh response did not include an access token.');
          saveAccessToken(payload.accessToken);
          request.headers.Authorization = `Bearer ${payload.accessToken}`;
          return client(request);
        } catch (refreshError) {
          clearTokens();
          localStorage.removeItem('jnu_bazaar_user');
          return Promise.reject(refreshError.response ? toApiError(refreshError) : refreshError);
        }
      }

      return Promise.reject(toApiError(axiosError));
    },
  );
}
