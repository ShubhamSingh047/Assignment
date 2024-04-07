import React, { useEffect, useContext } from "react";
import LoginForm from "./LoginForm";
import ProductionListing from "../ProductListing/ProductionListing";
import ErrorComponent from "../Error/ErrorComponent";
import Loading from "../Loading/Loading";
import { AppStateContext } from "../GlobalStateContext/AppStateProvider";

const LoginPage: React.FC = () => {
  const {
    dispatch,
    state: { user, loading, errorState, valid, errorMessage },
  } = useContext(AppStateContext);

  const url = import.meta.env.VITE_API_URL_LOGIN;

  useEffect(() => {
    const loginApi = async () => {
      try {
        const response = await fetch(`${url}`, {
          method: "POST",
          headers: { "Content-Type": "application/json" },
          body: JSON.stringify(user),
        });

        if (!response.ok) {
          const data = await response.json();
          throw new Error(data.errors); 
        }
        const data = await response.json();
        if (data.success) {
          dispatch({
            type: "success",
          });
          document.cookie = `token=${data.token}`;
        } else {
          // Handle incorrect password scenario
          dispatch({
            type: "error",
            payload: {
              errorState: true,
              loading: false,
              errorMessage: "Please enter correct credentails !",
            },
          });
        }
      } catch (error) {
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

    if (loading) {
      loginApi();
    }

  }, [user, loading, dispatch, url]);

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

export default LoginPage;
