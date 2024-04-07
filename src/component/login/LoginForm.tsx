import React, { useContext, ChangeEvent } from "react";
import { AppStateContext } from "../GlobalStateContext/AppStateProvider";

// Define the props interface for the component
const LoginForm: React.FC = () => {
  // Destructure state and dispatch from the context
  const { state, dispatch } = useContext(AppStateContext);
  // Destructure username and password from the user object in state
  const { username, password } = state.user;

  // Event handler for username input change
  const handleUsernameChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Dispatch action to update the username in the state
    dispatch({
      type: "user",
      payload: { username: e.target.value },
    });
  };

  // Event handler for password input change
  const handlePasswordChange = (e: ChangeEvent<HTMLInputElement>) => {
    // Dispatch action to update the password in the state
    dispatch({
      type: "password",
      payload: { password: e.target.value },
    });
  };

  // Event handler for login button click
  const handleLogin = () => {
    // Dispatch action to log in with the provided username and password
    dispatch({
      type: "login",
      payload: { username, password },
    });
  };

  // Render the login form JSX
  return (
    <div className="flex justify-center items-center h-screen">
      <div className="bg-gray-100 p-6 rounded-lg shadow-md">
        {/* Username input field */}
        <label htmlFor="username">Email:</label>
        <input
          id="username"
          className="block w-full mb-4 p-2 rounded-md border border-gray-300"
          type="email"
          placeholder="Username"
          value={username}
          onChange={handleUsernameChange} // Call handleUsernameChange on input change
        />

        {/* Password input field */}
        <label htmlFor="password">Password:</label>
        <input
          id="password"
          className="block w-full mb-4 p-2 rounded-md border border-gray-300"
          type="password"
          placeholder="Password"
          value={password}
          onChange={handlePasswordChange} // Call handlePasswordChange on input change
        />

        {/* Login button */}
        <button
          className="w-full bg-blue-500 text-white font-bold py-2 rounded-md hover:bg-blue-600"
          onClick={handleLogin} // Call handleLogin on button click
        >
          Login
        </button>
      </div>
    </div>
  );
};

// Export the LoginForm component
export default LoginForm;
