import React, { createContext, useEffect, useState } from 'react';
import { authService } from '@/features/auth/services/authService';
import { getAccessToken } from '@/features/auth/utils/tokenService';

export const AuthContext = createContext(null);

export const AuthProvider = ({ children }) => {
  const [user, setUser] = useState(() => authService.getCurrentUser());
  const [loading, setLoading] = useState(() => {
    const token = getAccessToken();
    return Boolean(token);
  });

  useEffect(() => {
    const token = getAccessToken();
    if (!token) {
      setLoading(false);
      return undefined;
    }

    let active = true;
    authService.fetchProfile()
      .then((profile) => { if (active) setUser(profile); })
      .catch(async (error) => {
        if (error.status === 401) {
          await authService.logout();
          if (active) setUser(null);
        }
      })
      .finally(() => { if (active) setLoading(false); });

    return () => { active = false; };
  }, []);

  const login = async (email, password) => {
    const loggedInUser = await authService.loginWithJnu(email, password);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const sendOtp = (username) => authService.requestEmailOtp(username);

  const resendOtp = (username) => authService.resendEmailOtp(username);

  const verifyOtp = async (username, otp) => {
    const verifiedUser = await authService.verifyEmailOtp(username, otp);
    setUser(verifiedUser);
    return verifiedUser;
  };

  const loginWithGoogle = (authResponse) => {
    const loggedInUser = authService.loginWithGoogle(authResponse);
    setUser(loggedInUser);
    return loggedInUser;
  };

  const logout = async () => {
    const logoutRequest = authService.logout();
    setUser(null);
    return logoutRequest;
  };

  const updateProfile = async (updates) => {
    const updated = await authService.updateProfile(updates);
    setUser(updated);
    return updated;
  };

  return (
    <AuthContext.Provider
      value={{
        user,
        isAuthenticated: Boolean(user && getAccessToken()),
        loading,
        login,
        loginWithGoogle,
        sendOtp,
        resendOtp,
        verifyOtp,
        logout,
        updateProfile,
        setCurrentUser: setUser,
      }}
    >
      {children}
    </AuthContext.Provider>
  );
};
