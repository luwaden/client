// src/hooks/products/useProductBySlug.ts

import { useReducer, useEffect } from "react";
import { productReducer } from "./productReducer";
import { initialState } from "./productTypes";
import { fetchProductBySlug } from "./productActions";

export const useProductBySlug = (slug: string) => {
  const [state, dispatch] = useReducer(productReducer, initialState);

  useEffect(() => {
    if (slug) fetchProductBySlug(slug, dispatch);
  }, [slug]);

  return state;
};
