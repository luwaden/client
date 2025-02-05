import { useReducer, useEffect } from "react";
import apiClient from "../ApiClients";
import { Product } from "../types/Product";
import { ApiError } from "../types/ApiError";

type ProductState = {
  isLoading: boolean;
  error: string | null;
  products: Product[];
  product: Product | null;
};

type ProductAction =
  | { type: "FETCH_PRODUCTS_REQUEST" }
  | { type: "FETCH_PRODUCTS_SUCCESS"; payload: Product[] }
  | { type: "FETCH_PRODUCTS_FAILURE"; payload: string }
  | { type: "FETCH_SINGLE_PRODUCT_REQUEST" }
  | { type: "FETCH_SINGLE_PRODUCT_SUCCESS"; payload: Product }
  | { type: "FETCH_SINGLE_PRODUCT_FAILURE"; payload: string };

const initialState: ProductState = {
  isLoading: false,
  error: null,
  products: [],
  product: null,
};

const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
    case "FETCH_SINGLE_PRODUCT_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "FETCH_PRODUCTS_SUCCESS":
      return { ...state, isLoading: false, products: action.payload };
    case "FETCH_SINGLE_PRODUCT_SUCCESS":
      return { ...state, isLoading: false, product: action.payload };
    case "FETCH_PRODUCTS_FAILURE":
    case "FETCH_SINGLE_PRODUCT_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const useProducts = () => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProducts = async () => {
      dispatch({ type: "FETCH_PRODUCTS_REQUEST" });
      try {
        const { data } = await apiClient.get<{ data: Product[] }>(
          "/api/products"
        );
        dispatch({ type: "FETCH_PRODUCTS_SUCCESS", payload: data.data });
      } catch (err) {
        const errorMessage =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to fetch products";
        dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: errorMessage });
      }
    };

    fetchProducts();
  }, []);

  return state;
};

export const useProductBySlug = (slug: string) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    const fetchProduct = async () => {
      dispatch({ type: "FETCH_SINGLE_PRODUCT_REQUEST" });
      try {
        const { data } = await apiClient.get<{ data: Product }>(
          `/api/products/slug/${slug}`
        );
        dispatch({ type: "FETCH_SINGLE_PRODUCT_SUCCESS", payload: data.data });
      } catch (err) {
        const errorMessage =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to fetch product";
        dispatch({
          type: "FETCH_SINGLE_PRODUCT_FAILURE",
          payload: errorMessage,
        });
      }
    };

    if (slug) fetchProduct();
  }, [slug]);

  return state;
};
