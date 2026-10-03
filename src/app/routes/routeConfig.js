export const ROUTES = Object.freeze({
  HOME: '/',
  LOGIN: '/login',
  OAUTH_CALLBACK: '/oauth/callback',
  MARKETPLACE: '/marketplace',
  PRODUCT_DETAILS: '/marketplace/products/:productId',
  SELL_PRODUCT: '/sell',
  WISHLIST: '/wishlist',
  CHAT: '/chat',
  PROFILE: '/profile',
  EDIT_PROFILE: '/profile/edit',
  NOTIFICATIONS: '/notifications',
});

export const NAVIGATION_ROUTES = Object.freeze({
  home: ROUTES.HOME,
  login: ROUTES.LOGIN,
  marketplace: ROUTES.MARKETPLACE,
  sell: ROUTES.SELL_PRODUCT,
  wishlist: ROUTES.WISHLIST,
  chat: ROUTES.CHAT,
  profile: ROUTES.PROFILE,
  'edit-profile': ROUTES.EDIT_PROFILE,
  notifications: ROUTES.NOTIFICATIONS,
});

export const buildProductDetailsPath = (productId) =>
  ROUTES.PRODUCT_DETAILS.replace(':productId', encodeURIComponent(productId));

/** Route access matches the current backend gateway and auth-service security rules. */
export const ROUTE_CONFIG = Object.freeze([
  { key: 'home', path: ROUTES.HOME, requiresAuth: false },
  { key: 'login', path: ROUTES.LOGIN, requiresAuth: false },
  { key: 'oauthCallback', path: ROUTES.OAUTH_CALLBACK, requiresAuth: false },
  { key: 'marketplace', path: ROUTES.MARKETPLACE, requiresAuth: true },
  { key: 'productDetails', path: ROUTES.PRODUCT_DETAILS, requiresAuth: true },
  { key: 'sellProduct', path: ROUTES.SELL_PRODUCT, requiresAuth: true, requiresJnuVerification: true },
  { key: 'wishlist', path: ROUTES.WISHLIST, requiresAuth: true },
  // The current backend has no chat or notifications APIs; these screens remain local demos.
  { key: 'chat', path: ROUTES.CHAT, requiresAuth: false },
  { key: 'profile', path: ROUTES.PROFILE, requiresAuth: true },
  { key: 'editProfile', path: ROUTES.EDIT_PROFILE, requiresAuth: true },
  { key: 'notifications', path: ROUTES.NOTIFICATIONS, requiresAuth: false },
]);
