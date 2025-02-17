import React, { useReducer, createContext } from "react";
import { AppState, initialState } from "./AppState";
import { reducer } from "./AppReducer";

type ContextProps = {
  state: AppState;
  dispatch: React.Dispatch<any>;
};

export const Context = createContext<ContextProps>({
  state: initialState,
  dispatch: () => {},
});

export const ContextProvider: React.FC<{ children: React.ReactNode }> = ({
  children,
}) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <Context.Provider value={{ state, dispatch }}>{children}</Context.Provider>
  );
};
