import { useEffect, useReducer, useState } from "react";
import "./App.css";
import Loading from "./component/Loading/Loading";
import ErrorComponent from "./component/Error/ErrorComponent";

let intailState = {
  valid: false,
  user: {
    username: "",
    password: "",
  },
  error: false,
  loading: false,
};

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

function App() {
  const [state, dispatch] = useReducer(reducer, intailState);

  const {
    error,
    loading,
    valid,
    user: { username, password },
  } = state;

  useEffect(() => {
    const loginApi = async () => {
      try {
        const response = await fetch(
          `https://kiosk-backend.nutritap.in/api/users/admin-login`,
          {
            method: "POST",
            headers: { "Content-Type": "application/json" },
            body: JSON.stringify(state.user),
          }
        );
        console.log(response);
        if (response.ok) {
          const data = await response.json();
          console.log(data, "data");
          if (data.success) {
            dispatch({
              type: "success",
            });

            document.cookie = `token=${data.token}; path=/`;
          } else {
            if (loading) {
              dispatch({
                type: "error",
                payload: { error: true, loading: false },
              });
              throw new Error("Api loading failed");
            }
          }
        } else {
          if (loading) {
            dispatch({
              type: "error",
              payload: { error: true, loading: false },
            });
            throw new Error("Api loading failed");
          }
        }
      } catch (error) {
        console.error(error);
      } finally {
        console.log("promise completed");
      }
    };
    if (loading) loginApi();
    return () => {
      state;
    };
  }, [username, password, error, loading]);

  const handleLogin = () => {
    dispatch({ type: "login", payload: { username, password } });
    dispatch({ type: "loading", payload: true });
  };

  return (
    <>
      {loading && !error ? <Loading /> : null}
      {error && !loading ? (
        <ErrorComponent />
      ) : (
        <>
          {valid ? (
            <div>Product Listing</div>
          ) : (
            <>
              <input
                type="email"
                placeholder="user name"
                value={username}
                onChange={(e) =>
                  dispatch({
                    type: "user",
                    payload: { username: e.target.value },
                  })
                }
              />
              <input
                type="password"
                placeholder="password"
                value={password}
                onChange={(e) =>
                  dispatch({
                    type: "password",
                    payload: { password: e.target.value },
                  })
                }
              />
              <button onClick={handleLogin}>login</button>
            </>
          )}
        </>
      )}
    </>
  );
}

export default App;
