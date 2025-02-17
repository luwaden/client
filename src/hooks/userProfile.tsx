import { useReducer } from "react";
import apiClient from "../ApiClients";
import { ApiError } from "../types/ApiError";
import { getError } from "../utils";
import { UserInfo } from "../types/UserInfo";

type ProfileState = {
  isLoading: boolean;
  error: ApiError | null;
};

type ProfileAction =
  | { type: "UPDATE_REQUEST" }
  | { type: "UPDATE_SUCCESS" }
  | { type: "UPDATE_FAILURE"; payload: ApiError };

const initialState: ProfileState = {
  isLoading: false,
  error: null,
};

const profileReducer = (
  state: ProfileState,
  action: ProfileAction
): ProfileState => {
  switch (action.type) {
    case "UPDATE_REQUEST":
      return { ...state, isLoading: true, error: null };
    case "UPDATE_SUCCESS":
      return { ...state, isLoading: false };
    case "UPDATE_FAILURE":
      return { ...state, isLoading: false, error: action.payload };
    default:
      return state;
  }
};

export const useProfile = () => {
  const [state, dispatch] = useReducer(profileReducer, initialState);

  const updateProfile = async (
    userInfo: UserInfo,
    updateData: Partial<UserInfo> & { password?: string }
  ) => {
    dispatch({ type: "UPDATE_REQUEST" });
    try {
      const { data } = await apiClient.put("/api/profile", updateData, {
        headers: { Authorization: `Bearer ${userInfo.token}` },
      });
      dispatch({ type: "UPDATE_SUCCESS" });
      return data;
    } catch (err) {
      const message = getError(err);
      dispatch({ type: "UPDATE_FAILURE", payload: { message } as ApiError });
      throw new Error(message);
    }
  };

  return {
    updateProfile,
    isLoading: state.isLoading,
    error: state.error,
  };
};
