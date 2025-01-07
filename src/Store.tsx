// import React from "react";

// type AppState = {
//   mode: string;
// };

// const initialState: AppState = {
//   mode:
//     localStorage.getItem("mode") ??
//     (window.matchMedia &&
//     window.matchMedia("(prefers-color-scheme: dark)").matches
//       ? "dark"
//       : "light"),
// };

// type Action = { type: "SWITCH_MODE" };

// const reducer = (state = initialState, action: Action) => {
//   switch (action.type) {
//     case "SWITCH_MODE":
//       return { mode: state.mode === "dark" ? "light" : "dark" };
//     default:
//       return state;
//   }
// };

// const defaultDispatch: React.Dispatch<Action> = () => initialState;
// const Store = React.createContext({
//   state: initialState,
//   dispatch: defaultDispatch,
// });

// function StoreProvider({ children }: React.PropsWithChildren<{}>) {
//   const [state, dispatch] = React.useReducer<React.Reducer<AppState, Action>>(
//     reducer,
//     initialState
//   );
//   return (
//     <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
//   );
// }

// export { Store, StoreProvider };

import React from "react";

type AppState = {
  mode: string;
};

const initialState: AppState = {
  mode:
    localStorage.getItem("mode") ??
    (window.matchMedia &&
    window.matchMedia("(prefers-color-scheme: dark)").matches
      ? "dark"
      : "light"),
};

type Action = { type: "SWITCH_MODE" };

const reducer: React.Reducer<AppState, Action> = (state, action) => {
  switch (action.type) {
    case "SWITCH_MODE":
      const newMode = state.mode === "dark" ? "light" : "dark";
      localStorage.setItem("mode", newMode); // Persist mode in localStorage
      return { mode: newMode };
    default:
      return state;
  }
};

const defaultDispatch: React.Dispatch<Action> = () => {
  throw new Error("Dispatch function not initialized.");
};

const Store = React.createContext<{
  state: AppState;
  dispatch: React.Dispatch<Action>;
}>({
  state: initialState,
  dispatch: defaultDispatch,
});

const StoreProvider: React.FC<React.PropsWithChildren<{}>> = ({ children }) => {
  const [state, dispatch] = React.useReducer(reducer, initialState);

  return (
    <Store.Provider value={{ state, dispatch }}>{children}</Store.Provider>
  );
};

export { Store, StoreProvider };
