import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/Cart";
import { Product } from "./types/Product";

export const getError = (error: unknown): string => {
  if (typeof error === "string") {
    return error; // If error is already a string
  }

  if (error && typeof error === "object" && "response" in error) {
    const apiError = error as ApiError;
    if (apiError.response?.data?.message) {
      return apiError.response.data.message; // Extract message from API response
    }
  }

  return "An unknown error occurred."; // Fallback message
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
