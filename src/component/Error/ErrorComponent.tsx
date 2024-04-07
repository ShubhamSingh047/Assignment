import React, { useContext } from "react";
import { AppStateContext } from "../GlobalStateContext/AppStateProvider";

interface ErrorComponentProps {
  message?: string;
}

const ErrorComponent: React.FC<ErrorComponentProps> = ({
  message = "Something went wrong. Please try again later.",
}) => {
  const { dispatch } = useContext(AppStateContext);

  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0"></div>
      <div className="bg-white bg-opacity-80 p-12 rounded-lg shadow-md relative z-10 max-w-3xl">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              dispatch({
                type: "error",
                payload: { errorState: false, errorMessage: "" },
              });
            }}
            className="focus:outline-none"
          >
            <svg
              xmlns="http://www.w3.org/2000/svg"
              className="h-6 w-6 text-blue-500 hover:text-blue-600"
              fill="none"
              viewBox="0 0 24 24"
              stroke="currentColor"
            >
              <path
                strokeLinecap="round"
                strokeLinejoin="round"
                strokeWidth={2}
                d="M10 19l-7-7m0 0l7-7m-7 7h18"
              />
            </svg>
          </button>
          <h2 className="text-3xl font-bold text-red-300">Error</h2>
          <div></div>
        </div>
        <div className="text-center">
          <p className="mt-4 text-lg py-10 px-20 text-gray-700">{message}</p>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
