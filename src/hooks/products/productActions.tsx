import { Product } from "../../types/Product";
import apiClient from "../../ApiClients";
import { ProductAction } from "./productTypes";

// Fetch paginated products
export const fetchProducts = async (
  page: number,
  dispatch: React.Dispatch<ProductAction>
) => {
  dispatch({ type: "FETCH_PRODUCTS_REQUEST" });

  try {
    const { data } = await apiClient.get<{
      data: Product[];
      totalPages: number;
      currentPage: number;
    }>(`/api/products?page=${page}&pageSize=10`);

    dispatch({
      type: "FETCH_PRODUCTS_SUCCESS",
      payload: {
        products: data.data,
        totalPages: data.totalPages,
        currentPage: data.currentPage,
      },
    });
  } catch (err) {
    const errorMessage =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to fetch products";
    dispatch({ type: "FETCH_PRODUCTS_FAILURE", payload: errorMessage });
  }
};

// Fetch a single product by slug
export const fetchProductBySlug = async (
  slug: string,
  dispatch: React.Dispatch<ProductAction>
) => {
  dispatch({ type: "FETCH_SINGLE_PRODUCT_REQUEST" });

  try {
    const { data } = await apiClient.get<{ data: Product }>(
      `/api/products/slug/${slug}`
    );
    dispatch({ type: "FETCH_SINGLE_PRODUCT_SUCCESS", payload: data.data });
  } catch (err) {
    const errorMessage =
      (err as { response?: { data?: { message?: string } } })?.response?.data
        ?.message || "Failed to fetch product";
    dispatch({ type: "FETCH_SINGLE_PRODUCT_FAILURE", payload: errorMessage });
  }
};
