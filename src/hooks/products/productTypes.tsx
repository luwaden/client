// src/hooks/products/productTypes.ts

import { Product } from "../../types/Product";

// Define the state shape for products
export type ProductState = {
  isLoading: boolean;
  error: string | null;
  products: Product[];
  product: Product | null;
  totalPages: number;
  currentPage: number;
};

// Define possible action types
export type ProductAction =
  | { type: "FETCH_PRODUCTS_REQUEST" }
  | {
      type: "FETCH_PRODUCTS_SUCCESS";
      payload: { products: Product[]; totalPages: number; currentPage: number };
    }
  | { type: "FETCH_PRODUCTS_FAILURE"; payload: string }
  | { type: "FETCH_SINGLE_PRODUCT_REQUEST" }
  | { type: "FETCH_SINGLE_PRODUCT_SUCCESS"; payload: Product }
  | { type: "FETCH_SINGLE_PRODUCT_FAILURE"; payload: string };

// Initial state for the reducer
export const initialState: ProductState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
  totalPages: 0,
  currentPage: 1,
};
