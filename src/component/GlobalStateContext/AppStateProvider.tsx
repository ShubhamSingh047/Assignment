import React, { createContext, useReducer, ReactNode } from "react";

// Define the interface for the User
interface User {
  username: string;
  password: string;
}

// Define the interface for the AppState
interface AppState {
  valid: boolean;
  user: User;
  errorState: boolean;
  loading: boolean;
  errorMessage: string;
  listing: ListingType;
}

// Define the type for the listing data
type ListingType = (string | number | object)[];

// Initial state for the app
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

// Create context for the app state and dispatch function
export const AppStateContext = createContext<{
  state: AppState;
  dispatch: React.Dispatch<any>;
}>({
  state: initialState,
  dispatch: () => null,
});

// Define the action types
type Action =
  | { type: "user"; payload: { username: string } }
  | { type: "password"; payload: { password: string } }
  | { type: "error"; payload: { errorState: boolean; errorMessage: string } }
  | { type: "loading"; payload: boolean }
  | { type: "login"; payload: { username: string; password: string } }
  | { type: "success" }
  | { type: "product/listing"; payload: any[] }; // Update this type to match your listing data structure

// Reducer function to update the app state
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

// AppStateProvider component to provide app state to the entire app
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
