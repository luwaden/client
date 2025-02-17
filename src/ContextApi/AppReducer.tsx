import React from "react";
import { Cart, CartItem, ShippingAddress } from "../types/Cart";
import { UserInfo } from "../types/UserInfo";
import { AppState } from "./AppState";

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: CartItem }
  | { type: "SIGNIN_REQUEST" }
  | { type: "SIGNIN_SUCCESS"; payload: UserInfo }
  | { type: "SIGNIN_FAILURE"; payload: Error }
  | { type: "SIGNOUT_USER" }
  | { type: "SAVE_SHIPPING_ADDRESS"; payload: ShippingAddress }
  | { type: "SAVE_PAYMENT_METHOD"; payload: string }
  | { type: "CART_CLEAR" };

export const reducer: React.Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case "SWITCH_MODE":
      const newMode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", newMode);
      return { ...state, mode: newMode };
    case "ADD_TO_CART":
      const newItem = action.payload;
      const cartItems = state.cart.cartItems.some(
        (item) => item._id === newItem._id
      )
        ? state.cart.cartItems.map((item) =>
            item._id === newItem._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    case "REMOVE_FROM_CART":
      const updatedCartItems = state.cart.cartItems.filter(
        (item) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(updatedCartItems));
      return { ...state, cart: { ...state.cart, cartItems: updatedCartItems } };
    case "SIGNIN_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "SIGNIN_SUCCESS":
      localStorage.setItem("userInfo", JSON.stringify(action.payload));
      return { ...state, isLoading: false, userInfo: action.payload };
    case "SIGNIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "SIGNOUT_USER":
      localStorage.removeItem("userInfo");
      localStorage.removeItem("cartItems");
      localStorage.removeItem("shippingAddress");
      localStorage.removeItem("paymentMethod");
      return {
        ...state,
        userInfo: null,
        cart: { ...state.cart, cartItems: [] },
      };
    case "SAVE_SHIPPING_ADDRESS":
      localStorage.setItem("shippingAddress", JSON.stringify(action.payload));
      return {
        ...state,
        cart: { ...state.cart, shippingAddress: action.payload },
      };
    case "SAVE_PAYMENT_METHOD":
      localStorage.setItem("paymentMethod", action.payload);
      return {
        ...state,
        cart: { ...state.cart, paymentMethod: action.payload },
      };
    case "CART_CLEAR":
      return { ...state, cart: { ...state.cart, cartItems: [] } };
    default:
      return state;
  }
};
