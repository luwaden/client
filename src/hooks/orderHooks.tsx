import { useReducer, useEffect } from "react";
import apiClient from "../ApiClients";
import { Order } from "../types/Order";
import { ApiError } from "../types/ApiError";

type OrderState = {
  isLoading: boolean;
  error: string | null;
  order: Order | null;
};

type OrderAction =
  | { type: "ORDER_REQUEST" }
  | { type: "ORDER_SUCCESS"; payload: Order }
  | { type: "ORDER_FAILURE"; payload: string };

const initialState: OrderState = {
  isLoading: false,
  error: null,
  order: null,
};

const orderReducer = (state: OrderState, action: OrderAction): OrderState => {
  switch (action.type) {
    case "ORDER_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "ORDER_SUCCESS":
      return { ...state, isLoading: false, order: action.payload };
    case "ORDER_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const useOrder = (orderId: string, token: string) => {
  const [state, dispatch] = useReducer(orderReducer, initialState);

  useEffect(() => {
    const fetchOrder = async () => {
      dispatch({ type: "ORDER_REQUEST" });
      try {
        const { data } = await apiClient.get<Order>(`/api/order/${orderId}`, {
          headers: { Authorization: `Bearer ${token}` },
        });
        dispatch({ type: "ORDER_SUCCESS", payload: data });
      } catch (err) {
        const errorMessage =
          (err as { response?: { data?: { message?: string } } })?.response
            ?.data?.message || "Failed to fetch order";
        dispatch({ type: "ORDER_FAILURE", payload: errorMessage });
      }
    };

    if (orderId && token) fetchOrder();
  }, [orderId, token]);

  return state;
};
