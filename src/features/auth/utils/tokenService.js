const ACCESS_TOKEN_KEY = 'jnu_token';
const REFRESH_TOKEN_KEY = 'jnu_refresh_token';

export const saveAccessToken = (token) => {
  if (token) localStorage.setItem(ACCESS_TOKEN_KEY, token);
};

export const getAccessToken = () => localStorage.getItem(ACCESS_TOKEN_KEY);

export const saveRefreshToken = (token) => {
  if (token) localStorage.setItem(REFRESH_TOKEN_KEY, token);
};

export const getRefreshToken = () => localStorage.getItem(REFRESH_TOKEN_KEY);

export const saveTokens = (accessToken, refreshToken) => {
  saveAccessToken(accessToken);
  saveRefreshToken(refreshToken);
};

export const clearTokens = () => {
  localStorage.removeItem(ACCESS_TOKEN_KEY);
  localStorage.removeItem(REFRESH_TOKEN_KEY);
};
