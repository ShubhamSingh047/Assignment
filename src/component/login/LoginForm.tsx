import React, { useContext, ChangeEvent } from "react";
import { AppStateContext } from "../GlobalStateContext/AppStateProvider";

const LoginForm: React.FC = () => {
  const { state, dispatch } = useContext(AppStateContext);
  const { username, password } = state.user;

  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "user",
      payload: { username: e.target.value },
    });
  };

  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    dispatch({
      type: "password",
      payload: { password: e.target.value },
    });
  };

  const handleLogin = () => {
    dispatch({
      type: "login",
      payload: { username, password },
    });
  };

  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        <label htmlFor="username">Email:</label>
        <input
          id="username"
          className="block w-full mb-4 p-2 rounded-md border border-gray-300"
          type="email"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange}
        />

        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className="block w-full mb-4 p-2 rounded-md border border-gray-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange}
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

export default LoginForm;
