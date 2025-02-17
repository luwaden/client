import React from "react";
import { Cart, CartItem, ShippingAddress } from "../types/Cart";
import { UserInfo } from "../types/UserInfo";

export interface AppState {
  mode: string;
  cart: Cart;
  userInfo?: UserInfo | null;
  isLoading: boolean;
  error: Error | null;
}

export const initialState: AppState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : null,
  isLoading: false,
  error: null,
  mode:
    localStorage.getItem("mode") ??
    (window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod") || "PayStack",
    shippingPrice: 0,
    itemsPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};
