import { API_DELAY } from './api.config';

// Simulate API delay for realistic experience
export const simulateDelay = (ms: number = API_DELAY): Promise<void> => {
  return new Promise((resolve) => setTimeout(resolve, ms));
};

// Generic CRUD helper for endpoints
export const createEndpointHelper = <T>(endpoint: string) => {
  return {
    getAll: async (): Promise<T[]> => {
      await simulateDelay();
      // Return mock data - will be implemented in services
      return [] as T[];
    },
    
    getById: async (id: string): Promise<T> => {
      await simulateDelay();
      // Return mock data - will be implemented in services
      return {} as T;
    },
    
    create: async (data: Partial<T>): Promise<T> => {
      await simulateDelay();
      // Return mock data - will be implemented in services
      return data as T;
    },
    
    update: async (id: string, data: Partial<T>): Promise<T> => {
      await simulateDelay();
      // Return mock data - will be implemented in services
      return data as T;
    },
    
    delete: async (id: string): Promise<void> => {
      await simulateDelay();
      // Return mock data - will be implemented in services
    },
  };
};
