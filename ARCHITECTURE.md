# Frontend architecture

The frontend uses feature based organization. App composition, providers, and React Router configuration live under `src/app`. Each business feature owns its pages and related UI, state, and API services. Shared infrastructure and genuinely reusable UI live under `src/shared`.

```text
src/
  app/
    App.jsx
    providers/AppProviders.jsx
    routes/                  React Router route map, route config, auth guard
  pages/                     Cross-feature NotFound page
  features/
    auth/                    OTP and OAuth, profile pages, context, hooks, token storage
    categories/               Category browsing UI
    chat/                     Chat page and local demo store (backend has no chat API)
    home/                     Landing page and home components
    notifications/            Notifications page (local demo)
    products/                 Marketplace and product detail pages, product service
    sellers/                  Sell page, seller UI, seller service
    wishlist/                 Wishlist page and service
  shared/
    api/                      Central Axios client, endpoint map, interceptors
    assets/                   Shared images and logos
    components/               Reusable layout and UI components
    config/                   Environment configuration and demo fixtures
    utils/                    Shared formatting and framework-independent helpers
  index.css                   Global styles and Tailwind directives
  main.jsx                    Vite entry point
```

## Routing

`src/app/App.jsx` composes `AppProviders` and `AppRoutes`. `AppProviders` owns the `BrowserRouter` and authentication provider. `src/app/routes/routeConfig.js` is the single source of route paths and access metadata; `AppRoutes.jsx` renders those definitions with React Router. `ProtectedRoute.jsx` waits for session restoration, then redirects unauthenticated users to login and preserves their destination.

The marketplace, product details, sell, wishlist, profile, and edit profile pages require authentication because the API gateway protects the marketplace routes and the auth service protects user routes. The backend currently has no chat or notification APIs, so those existing pages remain local demo features. There is no backend order or registration endpoint.

## Environment and API

The ignored root `.env` is the only environment file. It contains local public configuration:

```env
VITE_API_BASE_URL=http://localhost:8080/api
VITE_AUTH_SERVER_ORIGIN=http://localhost:8080
```

`src/shared/config/env.js` is the only module that reads Vite environment variables. Configure the frontend origin in backend CORS for deployment. The frontend sends API requests through `src/shared/api/axiosClient.js`, which sets the base URL, adds the stored bearer token, serializes query parameters, and performs a single refresh retry after 401 responses.

`src/shared/api/apiEndpoints.js` contains backend endpoint paths relative to `VITE_API_BASE_URL`:

| Feature | Operations | Gateway path |
| --- | --- | --- |
| Auth | OTP send, verify, resend; refresh; logout | `/api/v1/auth/core/...` |
| Google OAuth | Start authorization | `/api/v1/auth/oauth2/authorization/google` |
| User | Current profile, profile image, verification, public profile, delete account | `/api/v1/auth/users/...` |
| Products | List, create, details, update, delete, seller listings | `/api/v1/marketplace/products...` |
| Wishlist | Read, add, remove | `/api/v1/marketplace/wishlist...` |

Feature services use the central Axios client and endpoint map. OTP credentials and session tokens follow the Spring Boot auth response contract. Password login is not supported by the backend; local development retains a clearly marked demo fallback. The chat and notifications screens use local demo state because the backend does not expose those APIs.

## Imports and checks

Use the `@/` alias for imports from `src`; it is configured in Vite and `jsconfig.json`. Run `npm run build` to verify the Vite production build. The project currently has no lint script.
