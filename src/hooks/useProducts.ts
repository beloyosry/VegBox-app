import { useQuery } from '@tanstack/react-query';
import { productService } from '../services';

export const useProducts = () => {
  return useQuery({
    queryKey: ['products'],
    queryFn: productService.getProducts,
  });
};

export const useProduct = (id: string) => {
  return useQuery({
    queryKey: ['product', id],
    queryFn: () => productService.getProductById(id),
    enabled: !!id,
  });
};

export const useCategories = () => {
  return useQuery({
    queryKey: ['categories'],
    queryFn: productService.getCategories,
  });
};

export const useFlashSaleProducts = () => {
  return useQuery({
    queryKey: ['flash-sale-products'],
    queryFn: productService.getFlashSaleProducts,
  });
};

export const useTodaySpecials = () => {
  return useQuery({
    queryKey: ['today-specials'],
    queryFn: productService.getTodaySpecials,
  });
};

export const useRecipes = () => {
  return useQuery({
    queryKey: ['recipes'],
    queryFn: productService.getRecipes,
  });
};
