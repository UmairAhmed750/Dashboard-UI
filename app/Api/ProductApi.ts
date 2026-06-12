import { useQuery, useMutation, useQueryClient } from "@tanstack/react-query";
import axios from "axios";

// Interfaces
export interface Product {
  id: number;
  title: string;
  category: string;
  price: number;
  rating: number;
  brand?: string;
  thumbnail: string;
  tags: string[];
}

export interface Post {
  id: number;
  title: string;
  body?: string;
  userId?: number;
  tags?: string[];
}

// -------------------------------------------------------------
// 🛒 TABLE KE LIYE: Sirf Products Fetching (No Changes)
// -------------------------------------------------------------
export const getProducts = async (): Promise<Product[]> => {
  try {
    const res = await axios.get('https://dummyjson.com/products?limit=5');
    return (res.data.products || []) as Product[];
  } catch (error) {
    console.error("API Fetch Error:", error);
    return [];
  }
};

export const useProduct = () => {
  return useQuery<Product[]>({
    queryKey: ['products'],
    queryFn: getProducts,
    staleTime: 1000 * 60 * 5,
  });
};

// -------------------------------------------------------------
// 📝 FORM KE LIYE: Mukammal POSTS API (Get List, Update, Delete)
// -------------------------------------------------------------

// 🔥 NAYA HOOK: Poori Posts List Fetch Karne Ke Liye (Line-by-Line UI ke liye)
export const useGetPostsList = () => {
  return useQuery<Post[]>({
    queryKey: ['postsList'],
    queryFn: async () => {
      const res = await axios.get('https://dummyjson.com/posts?limit=10'); // 👈 Jitna data chahiye yahan likhein
      return res.data.posts as Post[];
    },
   staleTime: 0,
  });
};

// UPDATED: Ab yeh poori list ki cache memory mein se specific post update karega
export const useUpdateSinglePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async ({ id, title }: { id: number; title: string }) => {
      const res = await axios.put(`https://dummyjson.com/posts/${id}`, { title });
      return res.data;
    },
    onSuccess: (newData, variables) => {
      // 'postsList' ke folder mein jaakar naya title replace karna
      queryClient.setQueryData(['postsList'], (oldPosts: Post[] | undefined) => {
        return oldPosts?.map(post => post.id === variables.id ? { ...post, title: newData.title } : post);
      });
    }
  });
};

// UPDATED: Ab yeh poori list ki cache memory mein se us post ko delete (remove) karega
export const useDeleteSinglePost = () => {
  const queryClient = useQueryClient();
  return useMutation({
    mutationFn: async (id: number) => {
      await axios.delete(`https://dummyjson.com/posts/${id}`);
    },
    onSuccess: (data, id) => {
      // 'postsList' ke folder mein jaakar deleted post ko list se nikal dena
      queryClient.setQueryData(['postsList'], (oldPosts: Post[] | undefined) => {
        return oldPosts?.filter(post => post.id !== id);
      });
    }
  });
};