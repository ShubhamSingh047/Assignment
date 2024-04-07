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
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <input
          className="block w-full mb-4 p-2 rounded-md border border-gray-300"
          type="email"
          placeholder="Username"
          value={username}
          onChange={(e) =>
            dispatch({
              type: "user",
              payload: { username: e.target.value },
            })
          }
        />
        <input
          className="block w-full mb-4 p-2 rounded-md border border-gray-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) =>
            dispatch({
              type: "password",
              payload: { password: e.target.value },
            })
          }
        />
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
          onClick={handleLogin}
        >
          Login
        </button>
      </div>
    </div>
  );
};

export default LoginForm

