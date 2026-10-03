import { Link, Navigate, useLocation } from 'react-router-dom';
import { useAuth } from '@/features/auth/hooks/useAuth';
import { ROUTES } from './routeConfig';
import { Loader } from '@/shared/components/ui/Loader';

export function ProtectedRoute({ children, requireJnuVerification = false }) {
  const { user, isAuthenticated, loading } = useAuth();
  const location = useLocation();

  if (loading) return <Loader message="Checking your session..." />;

  if (!isAuthenticated) {
    return <Navigate to={ROUTES.LOGIN} replace state={{ from: location }} />;
  }

  const email = String(user?.email || '').trim().toLowerCase();
  const isVerifiedJnuUser = user?.verified === true && email.endsWith('@jnu.ac.in');
  if (requireJnuVerification && !isVerifiedJnuUser) {
    return (
      <main className="flex min-h-[60vh] items-center justify-center px-4 py-16">
        <section className="w-full max-w-lg rounded-2xl border border-[#dce2eb] bg-white p-8 text-center shadow-sm">
          <h1 className="text-2xl font-semibold text-navy-950">Verify your JNU email to sell</h1>
          <p className="mt-3 text-sm leading-6 text-navy-700/75">
            Only users with a verified @jnu.ac.in account can list products. Sign in with your JNU email and complete email verification to continue.
          </p>
          <Link to={ROUTES.LOGIN} state={{ from: location }} className="mt-6 inline-flex rounded-lg bg-campus-blue px-5 py-3 text-sm font-semibold text-white hover:bg-blue-800">
            Verify with JNU email
          </Link>
        </section>
      </main>
    );
  }

  return children;
}
