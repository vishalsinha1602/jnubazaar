import { AuthProvider } from '@/features/auth/context/AuthContext';
import { BrowserRouter } from 'react-router-dom';

export function AppProviders({ children }) {
  return (
    <BrowserRouter>
      <AuthProvider>{children}</AuthProvider>
    </BrowserRouter>
  );
}
