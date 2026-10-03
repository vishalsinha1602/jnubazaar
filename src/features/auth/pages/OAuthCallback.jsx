import { useEffect, useRef, useState } from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from '@/app/routes/routeConfig';

export const OAuthCallback = () => {
  const [message, setMessage] = useState('Completing Google sign-in…');
  const handled = useRef(false);
  const navigate = useNavigate();
  const { loginWithGoogle } = useAuth();

  useEffect(() => {
    if (handled.current) return;
    handled.current = true;

    try {
      const params = new URLSearchParams(window.location.hash.slice(1));
      const authError = params.get('error');
      const authResponse = JSON.parse(params.get('auth') || 'null');
      window.history.replaceState(null, '', window.location.pathname);

      if (authError) throw new Error('Google sign-in failed. Please try again.');
      if (!authResponse) throw new Error('The sign-in response was missing. Please try again.');

      loginWithGoogle(authResponse);
      navigate(ROUTES.PROFILE, { replace: true });
    } catch (error) {
      setMessage(error.message || 'Google sign-in could not be completed.');
      window.setTimeout(() => navigate(ROUTES.LOGIN, {
        replace: true,
        state: { oauthError: error.message || 'Google sign-in could not be completed.' },
      }), 1200);
    }
  }, [loginWithGoogle, navigate]);

  return <main className="p-8 text-center text-navy-900">{message}</main>;
};
