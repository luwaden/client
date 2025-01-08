import React from "react";
import { Cart, CartItem } from "./types/Cart";

type AppState = {
  mode: string;
  cart: Cart;
};

const initialState: AppState = {
  mode:
    localStorage.getItem("mode") ??
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),

  cart: {
    cartItems: localStorage.getItem("cartItems")
      ? JSON.parse(localStorage.getItem("cartItems")!)
      : [],
    shippingAddress: localStorage.getItem("shippingAddress")
      ? JSON.parse(localStorage.getItem("shippingAddress")!)
      : {},
    paymentMethod: localStorage.getItem("paymentMethod")
      ? localStorage.getItem("paymentMethod")!
      : "PayPal",
    shippingPrice: 0,
    itemsPrice: 0,
    taxPrice: 0,
    totalPrice: 0,
  },
};

type Action =
  | { type: "SWITCH_MODE" }
  | { type: "UPDATE_CART"; payload: CartItem };

const reducer: React.Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case "SWITCH_MODE":
      const newMode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", newMode); // Persist mode in localStorage
      return { ...state, mode: newMode };
    case "UPDATE_CART":
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
