import { useMutation } from '@tanstack/react-query';
import { authService } from '../services';
import { useAuthStore } from '../store';
import { LoginCredentials } from '../types';

export const useLogin = () => {
  const setAuth = useAuthStore((state) => state.setAuth);

  return useMutation({
    mutationFn: (credentials: LoginCredentials) =>
      authService.login(credentials),
    onSuccess: (data) => {
      setAuth(data.user, data.token);
    },
  });
};

export const useLogout = () => {
  const clearAuth = useAuthStore((state) => state.clearAuth);

  return useMutation({
    mutationFn: authService.logout,
    onSuccess: () => {
      clearAuth();
    },
  });
};
