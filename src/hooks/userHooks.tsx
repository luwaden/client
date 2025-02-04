import React, { useReducer } from "react";
import apiClient from "../ApiClients";
import { UserInfo } from "../types/UserInfo";
import { ApiError } from "../types/ApiError"; // Import ApiError type

type UserState = {
  isLoading: boolean;
  error: ApiError | null; // Change to ApiError
  userInfo: UserInfo | null;
};

type UserAction =
  | { type: "SIGNIN_REQUEST" }
  | { type: "SIGNIN_SUCCESS"; payload: UserInfo }
  | { type: "SIGNIN_FAILURE"; payload: ApiError }; // Change to ApiError

const initialState: UserState = {
  isLoading: false,
  error: null,
  userInfo: null,
};

const userReducer = (state: UserState, action: UserAction): UserState => {
  switch (action.type) {
    case "SIGNIN_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "SIGNIN_SUCCESS":
      return { ...state, isLoading: false, userInfo: action.payload };
    case "SIGNIN_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const useSignin = () => {
  const [state, dispatch] = useReducer(userReducer, initialState);

  const signin = async (email: string, password: string): Promise<UserInfo> => {
    dispatch({ type: "SIGNIN_REQUEST" });
    try {
      const response = await apiClient.post<UserInfo>(`api/signin`, {
        email,
        password,
      });
      dispatch({ type: "SIGNIN_SUCCESS", payload: response.data });
      return response.data;
    } catch (err) {
      const errorMessage =
        (err as { message?: string }).message || "An error occurred"; // Get error message
      const apiError: ApiError = {
        message: errorMessage, // Include message property
        response: {
          data: { message: errorMessage }, // Ensure it conforms to ApiError
        },
      };
      dispatch({ type: "SIGNIN_FAILURE", payload: apiError });
      throw apiError; // Re-throw the ApiError for handling in the component
    }
  };

  return {
    signin,
    isLoading: state.isLoading,
    error: state.error,
    userInfo: state.userInfo,
  };
};
