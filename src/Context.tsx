import React from "react";
import { Cart, CartItem, ShippingAddress } from "./types/Cart";
import { UserInfo } from "./types/UserInfo";

type AppState = {
  mode: string;
  cart: Cart;
  userInfo?: UserInfo | null;
  isLoading: boolean;
  error: Error | null;
};

const initialState: AppState = {
  userInfo: localStorage.getItem("userInfo")
    ? JSON.parse(localStorage.getItem("userInfo") || "{}")
    : { token: "" },
  isLoading: false,
  error: null,
  mode:
    localStorage.getItem("mode") ??
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!).map(
          (item: CartItem) => ({
            ...item,
            price: Number(item.price), // Ensure price is a number
            quantity: Number(item.quantity), // Ensure quantity is a number
          })
        )
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayStack",
    shippingPrice: 0,
    itemsPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "ADD_TO_CART"; payload: CartItem }
  | { type: "REMOVE_FROM_CART"; payload: CartItem }
  | { type: "USER_SIGN_IN"; payload: UserInfo }
  | { type: "SIGNIN_REQUEST" }
  | { type: "SIGNIN_SUCCESS"; payload: UserInfo }
  | { type: "SIGNIN_FAILURE"; payload: Error }
  | { type: "SIGNOUT_USER" }
  | { type: "SAVE_SHIPPING_ADDRESS"; payload: ShippingAddress }
  | { type: "SAVE_PAYMENT_METHOD"; payload: string }
  | { type: "CART_CLEAR" };

const reducer: React.Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case "SWITCH_MODE":
      const newMode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", newMode); // Persist mode in localStorage
      return { ...state, mode: newMode };
    case "ADD_TO_CART":
      const newItem = action.payload;
      const existItems = state.cart.cartItems.find(
        (item: CartItem) => item._id === newItem._id
      );

      const cartItems = existItems
        ? state.cart.cartItems.map((item: CartItem) =>
            item._id === existItems._id ? newItem : item
          )
        : [...state.cart.cartItems, newItem];
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };

    case "REMOVE_FROM_CART": {
      const cartItems = state.cart.cartItems.filter(
        (item: CartItem) => item._id !== action.payload._id
      );
      localStorage.setItem("cartItems", JSON.stringify(cartItems));
      return { ...state, cart: { ...state.cart, cartItems } };
    }
    case "USER_SIGN_IN":
      return { ...state, userInfo: action.payload };
    case "SIGNIN_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "SIGNIN_SUCCESS":
      return { ...state, isLoading: false, userInfo: action.payload };
    case "SIGNIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    case "SIGNOUT_USER":
      return {
        mode:
          window.matchMedia &&
          window.matchMedia("(prefers-color-scheme: dark)").matches
            ? "dark"
            : "light",
        userInfo: null,
        cart: {
          cartItems: [],
          paymentMethod: "PayStack",
          shippingAddress: {
            fullName: "",
            address: "",
            postalCode: "",
            city: "",
            country: "",
          },
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
        isLoading: false,
        error: null,
      };

    case "SAVE_SHIPPING_ADDRESS":
      return {
        ...state,
        cart: {
          ...state.cart,
          shippingAddress: action.payload,
        },
      };
    case "SAVE_PAYMENT_METHOD":
      return {
        ...state,
        cart: {
          ...state.cart,
          paymentMethod: action.payload,
        },
      };

    case "CART_CLEAR":
      return {
        ...state,
        cart: {
          ...state.cart,
          cartItems: [],
          shippingAddress: {
            fullName: "",
            address: "",
            postalCode: "",
            city: "",
            country: "",
          },
          paymentMethod: "PayStack",
          itemsPrice: 0,
          shippingPrice: 0,
          taxPrice: 0,
          totalPrice: 0,
        },
      };

    default:
      return state;
  }
};

const defaultDispatch: React.Dispatch<Action> = () => {
  throw new Error("Dispatch function not initialized.");
};

const Context = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: defaultDispatch,
});

const ContextProvider: React.FC<React.PropsWithChildren<{}>> = ({
  children,
}) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};

export { Context, ContextProvider };
