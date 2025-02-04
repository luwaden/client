import { useReducer, useCallback, useEffect } from "react";
import axios from "axios";
import { getError } from "../utils";
import { ApiError } from "../types/ApiError";
import { Order } from "../types/Order";

type State = {
  order?: Order;
  isLoading: boolean;
  error?: string;
};

type Action =
  | { type: "FETCH_REQUEST" }
  | { type: "FETCH_SUCCESS"; payload: Order }
  | { type: "FETCH_FAIL"; payload: string };

const orderReducer = (state: State, action: Action): State => {
  switch (action.type) {
    case "FETCH_REQUEST":
      return { ...state, isLoading: true, error: undefined };
    case "FETCH_SUCCESS":
      return { ...state, isLoading: false, order: action.payload };
    case "FETCH_FAIL":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const useOrder = (orderId: string, token: string) => {
  const [state, dispatch] = useReducer(orderReducer, {
    order: undefined,
    isLoading: false,
    error: undefined,
  });

  const fetchOrder = useCallback(async () => {
    dispatch({ type: "FETCH_REQUEST" });
    try {
      const { data } = await axios.get(`/api/orders/${orderId}`, {
        headers: { Authorization: `Bearer ${token}` },
      });
      dispatch({ type: "FETCH_SUCCESS", payload: data });
    } catch (err) {
      dispatch({ type: "FETCH_FAIL", payload: getError(err as ApiError) });
    }
  }, [orderId, token]);

  useEffect(() => {
    fetchOrder();
  }, [fetchOrder]);

  return { ...state, refetch: fetchOrder };
};
