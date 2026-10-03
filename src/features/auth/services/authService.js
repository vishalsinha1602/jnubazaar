import axiosClient from '@/shared/api/axiosClient';
import { API_ENDPOINTS } from '@/shared/api/apiEndpoints';
import { env } from '@/shared/config/env';
import { clearTokens, getRefreshToken, saveTokens } from '../utils/tokenService';

const USER_STORAGE_KEY = 'jnu_bazaar_user';
const unwrapEnvelope = (response) => response?.data ?? response;

const toJnuUsername = (emailOrUsername) => String(emailOrUsername || '')
  .trim()
  .toLowerCase()
  .replace(/@jnu\.ac\.in$/i, '');

const getDefaultJnuAvatar = (user) => {
  if (user.authProvider && user.authProvider !== 'JNU_EMAIL') return '';
  if (!String(user.email || '').toLowerCase().endsWith('@jnu.ac.in')) return '';

  const seed = encodeURIComponent(user.username || user.email.split('@')[0] || 'Felix');
  return `https://api.dicebear.com/10.x/big-ears/svg?seed=${seed}`;
};

const normalizeUser = (user) => user && ({
  ...user,
  name: user.name || user.fullName || user.username || user.email?.split('@')[0] || 'JNU Member',
  id: user.id || user.username,
  avatar: user.avatar || user.profileImage || getDefaultJnuAvatar(user),
  affiliation: user.affiliation || 'JNU Community',
  verified: user.verified ?? user.verificationStatus === 'VERIFIED',
});

const storeSession = (response) => {
  const payload = unwrapEnvelope(response);
  const accessToken = payload?.accessToken || payload?.token;
  saveTokens(accessToken, payload?.refreshToken);
  const user = normalizeUser(payload?.user);
  if (user) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(user));
  return user;
};


export const authService = {
  getCurrentUser() {
    const stored = localStorage.getItem(USER_STORAGE_KEY);
    if (!stored) return null;
    try {
      return normalizeUser(JSON.parse(stored));
    } catch {
      return null;
    }
  },

  async fetchProfile() {
    const { data } = await axiosClient.get(API_ENDPOINTS.auth.profile);
    const profile = normalizeUser(unwrapEnvelope(data));
    if (profile) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    return profile;
  },

  async getPublicProfile(userId) {
    const { data } = await axiosClient.get(API_ENDPOINTS.auth.publicProfile(userId));
    return unwrapEnvelope(data);
  },

  async getVerificationStatus() {
    const { data } = await axiosClient.get(API_ENDPOINTS.auth.verification);
    return unwrapEnvelope(data);
  },

  async updateProfileImage(profileImage) {
    const { data } = await axiosClient.patch(API_ENDPOINTS.auth.profileImage, { profileImage });
    const profile = normalizeUser(unwrapEnvelope(data));
    if (profile) localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(profile));
    return profile;
  },

  async deleteAccount() {
    await axiosClient.delete(API_ENDPOINTS.auth.deleteAccount);
    localStorage.removeItem(USER_STORAGE_KEY);
    clearTokens();
  },

  async loginWithJnu(email) {
    throw new Error('Password login is not supported. Sign in with your JNU email OTP.');
  },

  async requestEmailOtp(email) {
    const { data } = await axiosClient.post(API_ENDPOINTS.auth.otp.send, { username: toJnuUsername(email) });
    return data;
  },

  async resendEmailOtp(email) {
    const { data } = await axiosClient.post(API_ENDPOINTS.auth.otp.resend, { username: toJnuUsername(email) });
    return data;
  },

  async verifyEmailOtp(email, otp) {
    const { data } = await axiosClient.post(API_ENDPOINTS.auth.otp.verify, { username: toJnuUsername(email), otp });
    return storeSession(data);
  },

  async refreshSession() {
    const refreshToken = getRefreshToken();
    if (!refreshToken) throw new Error('No refresh token is available. Please sign in again.');

    const { data } = await axiosClient.post(
      API_ENDPOINTS.auth.refresh,
      { refreshToken },
      { withCredentials: true },
    );
    storeSession(data);
    return unwrapEnvelope(data);
  },

  getGoogleOAuthUrl() {
    return new URL('/auth/oauth2/authorization/google', env.authServerOrigin).toString();
  },

  completeGoogleOAuth(authResponse) {
    const payload = unwrapEnvelope(authResponse);
    if (!payload?.accessToken || !payload?.refreshToken || !payload?.user) {
      throw new Error('Google sign-in did not return a complete authentication session.');
    }
    return storeSession(payload);
  },

  loginWithGoogle(authResponse) {
    return this.completeGoogleOAuth(authResponse);
  },

  async updateProfile(updates) {
    const currentUser = this.getCurrentUser() || {};
    const requestBody = {
      name: updates.name,
      phone: updates.phone || null,
      hostel: updates.hostel,
    };

    const { data } = await axiosClient.put(API_ENDPOINTS.auth.profile, requestBody);
    const updatedUser = normalizeUser({ ...currentUser, ...unwrapEnvelope(data) });
    localStorage.setItem(USER_STORAGE_KEY, JSON.stringify(updatedUser));
    return updatedUser;
  },

  async logout() {
    const refreshToken = getRefreshToken();
    const canRevokeSession = Boolean(refreshToken);
    const logoutRequest = canRevokeSession
      ? axiosClient.post(API_ENDPOINTS.auth.logout, { refreshToken }, { withCredentials: true })
      : Promise.resolve(null);

    localStorage.removeItem(USER_STORAGE_KEY);
    clearTokens();
    try {
      await logoutRequest;
      return Boolean(canRevokeSession);
    } catch {
      return false;
    }
  },
};
