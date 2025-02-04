import { useQuery } from "@tanstack/react-query";
import apiClient from "../ApiClients";
import { Product } from "../types/Product";
import { data } from "react-router-dom";

export const useGetProductsQuery = () => {
  return useQuery({
    queryKey: ["products"],
    queryFn: async () => {
      const response = await apiClient.get<{
        message: string;
        data: Product[];
        totalItem: number;
      }>(`api/products`);
      console.log(response); // Log the entire response object
      return response.data.data;
    },
  });
};

export const useGetProductsDetailsBySlugQuery = (slug: string) => {
  return useQuery({
    queryKey: ["products", slug],
    queryFn: async () =>
      (await apiClient.get<Product>(`api/products/${slug}`)).data,
  });
};
