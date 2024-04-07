// Import React and necessary components
import React, { useEffect, useContext } from "react";
import LoginForm from "./LoginForm";
import ProductionListing from "../ProductListing/ProductionListing";
import ErrorComponent from "../Error/ErrorComponent";
import Loading from "../Loading/Loading";
import { AppStateContext } from "../GlobalStateContext/AppStateProvider";

// Define LoginPage component
const LoginPage: React.FC = () => {
  // Destructure state and dispatch from context
  const {
    dispatch,
    state: { user, loading, errorState, valid, errorMessage },
  } = useContext(AppStateContext);

  // Define URL for login API
  const url = import.meta.env.VITE_API_URL_LOGIN;

  // Define effect to handle login API call
  useEffect(() => {
    // Define async function to call login API
    const loginApi = async () => {
      try {
        // Make POST request to login API
        const response = await fetch(`${url}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        // Check if response is not ok
        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.errors);
        }
        // Parse response JSON data
        const data = await response.json();
        // Check if login is successful
        if (data.success) {
          // Dispatch success action
          dispatch({
            type: "success",
          });
          // Set token in cookie
          document.cookie = `token=${data.token}`;
        } else {
          // Handle incorrect password scenario
          dispatch({
            type: "error",
            payload: {
              errorState: true,
              loading: false,
              errorMessage: "Please enter correct credentials!",
            },
          });
        }
      } catch (error) {
        // Dispatch error action
        dispatch({
          type: "error",
          payload: {
            errorState: true,
            loading: false,
            errorMessage: error.message,
          },
        });
      }
    };

    // Call login API if loading is true
    if (loading) {
      loginApi();
    }
  }, [user, loading, dispatch, url]);

  // Return JSX
  // Conditional rendering:
  // - If loading is true and there is no error state, render the Loading component.
  // - If loading is false and there is an error state, render the ErrorComponent with the error message.
  // - Otherwise, render either the ProductionListing or the LoginForm based on the validity of the user.
  return (
    <div className="bg-pink-100">
      {loading && !errorState ? <Loading /> : null}
      {!loading && errorState ? (
        <ErrorComponent message={errorMessage} />
      ) : (
        <>{valid ? <ProductionListing /> : <LoginForm />}</>
      )}
    </div>
  );
};

// Export LoginPage component
export default LoginPage;
