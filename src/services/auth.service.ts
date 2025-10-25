import { LoginCredentials, AuthResponse } from '../types';
import { simulateDelay } from '../config';
import { mockUser, validCredentials } from '../data/mock-data';

export const authService = {
  login: async (credentials: LoginCredentials): Promise<AuthResponse> => {
    await simulateDelay();
    
    // Validate credentials
    if (
      credentials.email === validCredentials.email &&
      credentials.password === validCredentials.password
    ) {
      return {
        user: mockUser,
        token: 'mock-jwt-token-' + Date.now(),
      };
    }
    
    throw new Error('Invalid email or password');
  },
  
  logout: async (): Promise<void> => {
    await simulateDelay(500);
  },
  
  validateToken: async (token: string): Promise<boolean> => {
    await simulateDelay(500);
    return token.startsWith('mock-jwt-token-');
  },
};
