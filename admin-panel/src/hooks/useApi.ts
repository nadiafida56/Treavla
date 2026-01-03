import { useQuery, useMutation, useQueryClient } from '@tanstack/react-query';
import api from '@/lib/axios';

export const useFetch = <T>(key: string[], url: string, options = {}) => {
  return useQuery<T>({
    queryKey: key,
    queryFn: async () => {
      const { data } = await api.get(url);
      return data;
    },
    ...options,
  });
};

export const usePost = <T, TVariables>(url: string, invalidateKey?: string[]) => {
  const queryClient = useQueryClient();
  
  return useMutation({
    mutationFn: async (payload: TVariables) => {
      const { data } = await api.post<T>(url, payload);
      return data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
  });
};

export const useUpdate = <T, TVariables>(url: string, invalidateKey?: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (payload: TVariables) => {
      const { data } = await api.put<T>(url, payload);
      return data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
  });
};

export const useDelete = (url: string, invalidateKey?: string[]) => {
  const queryClient = useQueryClient();

  return useMutation({
    mutationFn: async (id: string | number) => {
      const { data } = await api.delete(`${url}/${id}`);
      return data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
  });
};


export const usePostFormData = <T>(url: string, invalidateKey?: string[]) => {
  const queryClient = useQueryClient();

  return useMutation<T, Error, FormData>({
    mutationFn: async (formData: FormData) => {
      const { data } = await api.post<T>(url, formData, {
        headers: {
          // Let browser set the boundary automatically
          'Content-Type': 'multipart/form-data',
        },
      });
      return data;
    },
    onSuccess: () => {
      if (invalidateKey) {
        queryClient.invalidateQueries({ queryKey: invalidateKey });
      }
    },
  });
};