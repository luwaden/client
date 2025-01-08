import { ApiError } from "./types/ApiError";
import { CartItem } from "./types/Cart";
import { Product } from "./types/Product";

export const getError = (error: ApiError): string => {
  if (error.response && error.response.data && error.response.data.message) {
    return error.response.data.message; // Specific error message from API
  }
  if (error.response && typeof error.response === "string") {
    return error.response; // If response itself is a string
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
