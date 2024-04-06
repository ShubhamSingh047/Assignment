import React from "react";
import { useAppState } from "./AppStateProvider";
import Loading from "../Loading/Loading";
import ErrorComponent from "../Error/ErrorComponent";

// LoginForm component
const LoginForm = () => {
  const { state, dispatch } = useAppState();

  const handleLogin = () => {
    dispatch({
      type: "login",
      payload: { username: state.user.username, password: state.user.password },
    });
    dispatch({ type: "loading", payload: true });
  };

  return (
    <>
      <input
        type="email"
        placeholder="user name"
        value={state.user.username}
        onChange={(e) =>
          dispatch({ type: "user", payload: { username: e.target.value } })
        }
      />
      <input
        type="password"
        placeholder="password"
        value={state.user.password}
        onChange={(e) =>
          dispatch({ type: "password", payload: { password: e.target.value } })
        }
      />
      <button onClick={handleLogin}>login</button>
    </>
  );
};

// ProductListing component
const ProductListing = () => {
  return <div>Product Listing</div>;
};

// App component

