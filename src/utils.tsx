import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/Cart";
import { Product } from "./types/Product";

import { AxiosError } from "axios";

export const getError = (error: unknown): string => {
  if (typeof error === "string") {
    return error; // Direct string error
  }

  if (error instanceof AxiosError) {
    // Handle Axios errors with a response
    if (error.response) {
      return (
        error.response.data?.message ||
        `Request failed with status ${error.response.status}`
      );
    }

    // Handle Axios network errors
    if (error.request) {
      return "Network error: Please check your internet connection.";
    }
  }

  if (error instanceof Error) {
    return error.message; // Generic JavaScript error
  }

  return "An unknown error occurred. Please try again later."; // Fallback error message
};

export const convertProductToCartItem = (product: Product): CartItem => {
  const cartItem: CartItem = {
    _id: product._id,
    name: product.name,
    image: product.image,
    slug: product.image,
    quantity: 1,
    countInStock: product.countInStock,
    price: product.price,
  };
  return cartItem;
};
