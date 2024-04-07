import React from "react";

const ErrorComponent = () => {
  return (
    <div className="min-h-screen flex flex-col items-center justify-center">
      <div className="absolute inset-0 z-0">
        <img
          className="object-cover w-full h-full"
          // src=""
          alt="Background"
        />
      </div>
      <div className="bg-white bg-opacity-80 p-8 rounded-lg shadow-md relative z-10">
        <div className="flex justify-between items-center mb-6">
          <button
            onClick={() => {
              window.location.reload();
            }}
            className="text-blue-500 hover:text-blue-600 focus:outline-none"
          >
            Back
          </button>
          <h2 className="text-3xl font-bold text-red-600">Error</h2>
          <div></div>{" "}
          {/* This is a placeholder for the space occupied by the back button */}
        </div>
        <div className="text-center">
          <p className="mt-4 text-lg text-gray-700">
            Something went wrong. Please try again later.
          </p>
        </div>
      </div>
    </div>
  );
};

export default ErrorComponent;
