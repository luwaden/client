// src/hooks/products/useProducts.ts

import { useState, useReducer, useEffect } from "react";
import { productReducer } from "./productReducer";
import { initialState } from "./productTypes";
import { fetchProducts } from "./productActions";

export const useProducts = (initialPage: number = 1) => {
  const [state, dispatch] = useReducer(productReducer, initialState);
  const [page, setPage] = useState(initialPage);

  useEffect(() => {
    fetchProducts(page, dispatch);
  }, [page]);

  return { ...state, page, setPage };
};
