import { useReducer } from "react";
import apiClient from "../ApiClients";
import { Order } from "../types/Order"; // Ensure this type is defined
import { ApiError } from "../types/ApiError";

type OrderState = {
  isLoading: boolean;
  error: string | null;
  success: boolean;
  order: Order | null;
};

type OrderAction =
  | { type: "PLACE_ORDER_REQUEST" }
  | { type: "PLACE_ORDER_SUCCESS"; payload: Order }
  | { type: "PLACE_ORDER_FAILURE"; payload: string };

const initialState: OrderState = {
  isLoading: false,
  error: null,
  success: false,
  order: null,
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case "PLACE_ORDER_REQUEST":
      return { ...state, isLoading: true, error: null, success: false };
    case "PLACE_ORDER_SUCCESS":
      return {
        ...state,
        isLoading: false,
        success: true,
        order: action.payload,
      };
    case "PLACE_ORDER_FAILURE":
      return {
        ...state,
        isLoading: false,
        error: action.payload,
        success: false,
      };
    default:
      return state;
  }
};

export const usePlaceOrder = (token: string) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  const placeOrder = async (orderData: Partial<Order>): Promise<Order> => {
    dispatch({ type: "PLACE_ORDER_REQUEST" });
    try {
      const { data } = await apiClient.post<Order>("/api/order", orderData, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "PLACE_ORDER_SUCCESS", payload: data });
      return data;
    } catch (err) {
      const errorMessage =
        (err as { response?: { data?: { message?: string } } })?.response?.data
          ?.message || "An error occurred";
      dispatch({ type: "PLACE_ORDER_FAILURE", payload: errorMessage });
      throw new Error(errorMessage);
    }
  };

  return { ...state, placeOrder };
};
