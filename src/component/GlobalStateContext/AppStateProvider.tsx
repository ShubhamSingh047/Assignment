import React, { createContext, useReducer, ReactNode } from "react";


interface User {
  username: string;
  password: string;
}

interface AppState {
  valid: boolean;
  user: User;
  errorState: boolean;
  loading: boolean;
  errorMessage: string;
  listing: string | any[];
}

const initialState: AppState = {
  valid: false,
  user: {
    username: "",
    password: "",
  },
  errorState: false,
  loading: false,
  errorMessage: "",
  listing: [],
};

export const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

type Action =
  | { type: "user"; payload: { username: string } }
  | { type: "password"; payload: { password: string } }
  | { type: "error"; payload: { errorState: boolean; errorMessage: string } }
  | { type: "loading"; payload: boolean }
  | { type: "login"; payload: { username: string; password: string } }
  | { type: "success" }
  | { type: "product/listing"; payload: any[] }; // Update this type to match your listing data structure

const reducer = (state: AppState, action: Action): AppState => {
  switch (action.type) {
    case "user":
      return {
        ...state,
        user: { ...state.user, username: action.payload.username },
      };
    case "password":
      return {
        ...state,
        user: { ...state.user, password: action.payload.password },
      };
    case "error":
      return {
        ...state,
        errorState: action.payload.errorState,
        errorMessage: action.payload.errorMessage,
        loading: false,
      };
    case "loading":
      return {
        ...state,
        loading: action.payload,
      };
    case "login":
      return {
        ...state,
        user: {
          username: action.payload.username,
          password: action.payload.password,
        },
        loading: true,
      };
    case "success":
      return {
        ...state,
        valid: true,
        errorState: false,
        loading: false,
        errorMessage: "",
      };
    case "product/listing":
      return {
        ...state,
        errorState: false,
        loading: false,
        errorMessage: "",
        listing: action.payload,
      };
    default:
      return state;
  }
};


const AppStateProvider = ({ children }: { children: ReactNode }) => {
  const [state, dispatch] = useReducer(reducer, initialState);
  const globalState = { state, dispatch };
  return (
    <AppStateContext.Provider value={globalState}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
