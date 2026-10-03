import React, { useCallback, useEffect, useState } from 'react';
import { Route, Routes, useLocation, useNavigate, useParams } from 'react-router-dom';
import { ROUTES, ROUTE_CONFIG, NAVIGATION_ROUTES, buildProductDetailsPath } from './routeConfig';
import { ProtectedRoute } from './ProtectedRoute';
import { Navbar } from '@/shared/components/layout/Navbar';
import { Footer } from '@/shared/components/layout/Footer';
import { Home } from '@/features/home/pages/Home';
import { Marketplace } from '@/features/products/pages/Marketplace';
import { ProductDetails } from '@/features/products/pages/ProductDetails';
import { SellProduct } from '@/features/sellers/pages/SellProduct';
import { Wishlist } from '@/features/wishlist/pages/Wishlist';
import { Chat } from '@/features/chat/pages/Chat';
import { Profile } from '@/features/auth/pages/Profile';
import { EditProfile } from '@/features/auth/pages/EditProfile';
import { Notifications } from '@/features/notifications/pages/Notifications';
import { Login } from '@/features/auth/pages/Login';
import { OAuthCallback } from '@/features/auth/pages/OAuthCallback';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { productService } from '@/features/products/services/productService';
import { wishlistService } from '@/features/wishlist/services/wishlistService';
import NotFound from '@/pages/NotFound';

function ProductDetailsRoute(props) {
  const { productId } = useParams();
  return <ProductDetails {...props} productId={productId} />;
}

export default function AppRoutes() {
  const navigate = useNavigate();
  const location = useLocation();
  const { user, setCurrentUser, logout, updateProfile } = useAuth();
  const [darkMode, setDarkMode] = useState(
    () => localStorage.getItem('jnubazaar_theme') === 'dark',
  );
  const [wishlistIds, setWishlistIds] = useState([]);
  const [products, setProducts] = useState([]);
  const [loadingProducts, setLoadingProducts] = useState(true);
  const [productsError, setProductsError] = useState('');

  const refreshProducts = useCallback(async () => {
    setProductsError('');
    try {
      const data = await productService.getAll({});
      setProducts(data || []);
    } catch (error) {
      setProductsError(error.message || 'Could not load current listings.');
    }
  }, []);

  useEffect(() => {
    document.documentElement.classList.toggle('dark', darkMode);
    localStorage.setItem('jnubazaar_theme', darkMode ? 'dark' : 'light');
  }, [darkMode]);

  useEffect(() => {
    window.scrollTo({ top: 0 });
  }, [location.pathname]);

  useEffect(() => {
    let active = true;
    const loadProducts = async () => {
      setLoadingProducts(true);
      setProductsError('');
      try {
        const data = await productService.getAll({});
        if (active) setProducts(data || []);
      } catch (error) {
        if (active) {
          setProducts([]);
          setProductsError(error.message || 'Could not load current listings.');
        }
      } finally {
        if (active) setLoadingProducts(false);
      }
    };
    loadProducts();
    return () => { active = false; };
  }, [user]);

  useEffect(() => {
    let active = true;
    const loadWishlist = async () => {
      if (!user) {
        setWishlistIds([]);
        return;
      }
      try {
        const ids = await wishlistService.getWishlistIds();
        if (active) setWishlistIds(ids || []);
      } catch {
        if (active) setWishlistIds([]);
      }
    };
    loadWishlist();
    return () => { active = false; };
  }, [user, location.pathname]);

  const handleNavigate = (page, params = {}) => {
    const path = NAVIGATION_ROUTES[page] || ROUTES.HOME;
    const state = {};

    if (page === 'marketplace') state.filters = params.filters || params;
    if (page === 'home') state.scrollTarget = params.scrollTo || null;
    if (page === 'chat' && params.conversationId) state.conversationId = params.conversationId;
    if (page === 'sell' && params.productId) state.productId = params.productId;

    navigate(path, { state });
  };

  const handleOpenProduct = (productOrId) => {
    const productId = typeof productOrId === 'object' ? productOrId?.id : productOrId;
    if (!productId) return;
    if (!user) {
      navigate(ROUTES.LOGIN, {
        state: { from: { pathname: buildProductDetailsPath(productId) } },
      });
      return;
    }
    navigate(buildProductDetailsPath(productId));
  };

  const handleStartChat = () => navigate(ROUTES.CHAT);

  const handleWishlistToggle = async (productId) => {
    if (!user) {
      navigate(ROUTES.LOGIN, { state: { from: location } });
      return [];
    }
    try {
      const updated = await wishlistService.toggleWishlist(productId);
      setWishlistIds(updated || []);
      return updated;
    } catch {
      return wishlistIds;
    }
  };

  const handleLogout = async () => {
    await logout();
    navigate(ROUTES.HOME, { replace: true });
  };

  const unreadChatsCount = 0;

  const routeElements = {
    home: (
      <Home
        products={products}
        loading={loadingProducts}
        productsError={productsError}
        wishlistIds={wishlistIds}
        onWishlistToggle={handleWishlistToggle}
        onNavigate={handleNavigate}
        onOpenProduct={handleOpenProduct}
        onStartChat={handleStartChat}
        scrollTarget={location.state?.scrollTarget || null}
      />
    ),
    login: (
      <Login
        initialError={location.state?.oauthError || ''}
        onSuccess={(loggedInUser) => {
          setCurrentUser(loggedInUser);
          navigate(ROUTES.PROFILE, { replace: true });
        }}
      />
    ),
    oauthCallback: <OAuthCallback />,
    marketplace: (
      <Marketplace
        initialFilters={location.state?.filters || {}}
        onNavigate={handleNavigate}
        onOpenProduct={handleOpenProduct}
        onStartChat={handleStartChat}
      />
    ),
    productDetails: (
      <ProductDetailsRoute onNavigate={handleNavigate} onStartChat={handleStartChat} />
    ),
    sellProduct: <SellProduct user={user} onNavigate={handleNavigate} onProductSaved={refreshProducts} productId={location.state?.productId || null} />,
    wishlist: (
      <Wishlist
        onNavigate={handleNavigate}
        onOpenProduct={handleOpenProduct}
        onStartChat={handleStartChat}
      />
    ),
    chat: (
      <Chat
        onNavigate={handleNavigate}
        onOpenProduct={handleOpenProduct}
        initialConversationId={location.state?.conversationId || null}
      />
    ),
    profile: (
      <Profile user={user} onNavigate={handleNavigate} onOpenProduct={handleOpenProduct} />
    ),
    editProfile: (
      <EditProfile
        user={user}
        onNavigate={handleNavigate}
        onSave={async (updates) => {
          const updatedUser = await updateProfile(updates);
          setCurrentUser(updatedUser);
          navigate(ROUTES.PROFILE);
        }}
      />
    ),
    notifications: <Notifications products={products} onNavigate={handleNavigate} onOpenProduct={handleOpenProduct} />,
  };

  const activePage = location.pathname.startsWith('/marketplace')
    ? 'marketplace'
    : location.pathname === ROUTES.HOME
      ? 'home'
      : location.pathname.split('/')[1];

  return (
    <>
      <Navbar
        activePage={activePage}
        onNavigate={handleNavigate}
        user={user}
        wishlistCount={wishlistIds.length}
        unreadChatsCount={unreadChatsCount}
        onOpenLogin={() => navigate(ROUTES.LOGIN)}
        onLogout={handleLogout}
        darkMode={darkMode}
        onToggleDarkMode={() => setDarkMode((mode) => !mode)}
      />
      <Routes>
        {ROUTE_CONFIG.map(({ key, path, requiresAuth, requiresJnuVerification }) => {
          const element = routeElements[key];
          return (
            <Route
              key={key}
              path={path}
              element={requiresAuth ? <ProtectedRoute requireJnuVerification={requiresJnuVerification}>{element}</ProtectedRoute> : element}
            />
          );
        })}
        <Route path="*" element={<NotFound onNavigate={handleNavigate} />} />
      </Routes>
      <Footer onNavigate={handleNavigate} />
    </>
  );
}
