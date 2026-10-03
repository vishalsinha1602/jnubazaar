/** Only routes currently implemented by the Spring Boot backend. */
const API_V1 = '/v1';
const AUTH_ROOT = `${API_V1}/auth`;
const MARKETPLACE_ROOT = `${API_V1}/marketplace`;
const USER_ROOT = `${AUTH_ROOT}/users`;
const PRODUCT_ROOT = `${MARKETPLACE_ROOT}/products`;
const WISHLIST_ROOT = `${MARKETPLACE_ROOT}/wishlist`;

export const API_ENDPOINTS = Object.freeze({
  auth: Object.freeze({
    otp: Object.freeze({
      send: `${AUTH_ROOT}/core/otp/send`,
      verify: `${AUTH_ROOT}/core/otp/verify`,
      resend: `${AUTH_ROOT}/core/otp/resend`,
    }),
    refresh: `${AUTH_ROOT}/core/refresh`,
    logout: `${AUTH_ROOT}/core/logout`,
    googleOAuth: `${AUTH_ROOT}/oauth2/authorization/google`,
    profile: `${USER_ROOT}/me`,
    profileImage: `${USER_ROOT}/me/profile-image`,
    verification: `${USER_ROOT}/me/verification`,
    publicProfile: (userId) => `${USER_ROOT}/${encodeURIComponent(userId)}`,
    deleteAccount: `${USER_ROOT}/me`,
  }),
  products: Object.freeze({
    base: PRODUCT_ROOT,
    uploadImages: `${PRODUCT_ROOT}/images`,
    byId: (productId) => `${PRODUCT_ROOT}/${encodeURIComponent(productId)}`,
    bySeller: (sellerId) => `${PRODUCT_ROOT}/seller/${encodeURIComponent(sellerId)}`,
  }),
  wishlist: Object.freeze({
    base: WISHLIST_ROOT,
    byProduct: (productId) => `${WISHLIST_ROOT}/${encodeURIComponent(productId)}`,
  }),
});
