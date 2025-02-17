// src/hooks/products/productReducer.ts

import { ProductState, ProductAction, initialState } from "./productTypes";

export const productReducer = (
  state: ProductState,
  action: ProductAction
): ProductState => {
  switch (action.type) {
    case "FETCH_PRODUCTS_REQUEST":
    case "FETCH_SINGLE_PRODUCT_REQUEST":
      return { ...state, isLoading: true, error: null };

    case "FETCH_PRODUCTS_SUCCESS":
      return {
        ...state,
        isLoading: false,
        products: action.payload.products,
        totalPages: action.payload.totalPages,
        currentPage: action.payload.currentPage,
      };

    case "FETCH_SINGLE_PRODUCT_SUCCESS":
      return { ...state, isLoading: false, product: action.payload };

    case "FETCH_PRODUCTS_FAILURE":
    case "FETCH_SINGLE_PRODUCT_FAILURE":
      return { ...state, isLoading: false, error: action.payload };

    default:
      return state;
  }
};
