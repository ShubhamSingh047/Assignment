import React, { createContext, useContext, useEffect, useReducer } from "react";
import Loading from "./component/Loading/Loading";
import ErrorComponent from "./component/Error/ErrorComponent";

// Create a context for the app state
const AppStateContext = createContext();

// Custom hook to access the app state
export const useAppState = () => useContext(AppStateContext);

// Initial state for the app
const initialState = {
  valid: false,
  user: {
    username: "",
    password: "",
  },
  error: false,
  loading: false,
};

// Reducer function to update the state
const reducer = (state, action) => {
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
        error: action.payload.error,
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
        error: false,
        loading: false,
      };
    default:
      return state;
  }
};

// Provider component to provide the app state
const AppStateProvider = ({ children }) => {
  const [state, dispatch] = useReducer(reducer, initialState);

  return (
    <AppStateContext.Provider value={{ state, dispatch }}>
      {children}
    </AppStateContext.Provider>
  );
};

export default AppStateProvider;
