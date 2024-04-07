import { useEffect, useReducer } from "react";
import Loading from "./component/Loading/Loading";
import ErrorComponent from "./component/Error/ErrorComponent";
import ProductionListing from "./component/ProductListing/ProductionListing";

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
        if (response.ok) {
          const data = await response.json();
          if (data.success) {
            dispatch({
              type: "success",
            });
            document.cookie = `token=${data.token}`;
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
    <div className="bg-pink-100">
      {loading && !error ? <Loading /> : null}
      {error && !loading ? (
        <ErrorComponent />
      ) : (
        <>
          {valid ? (
            <div className="w-full mx-auto px-4 py-8">
              <ProductionListing />
            </div>
          ) : (
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
          )}
        </>
      )}
    </div>
  );
}

export default App;
