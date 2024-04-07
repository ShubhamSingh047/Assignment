import React from "react";

// Define the Loading component as a functional component
const Loading: React.FC = () => {
  // Render the loading indicator JSX
  return (
    <div className="flex items-center justify-center h-screen">
      {/* Loading spinner */}
      <div className="animate-spin rounded-full h-16 w-16 border-t-2 border-b-2 border-gray-900"></div>
      {/* Loading text */}
      <div className="ml-4 text-gray-900">Loading...</div>
    </div>
  );
};

// Export the Loading component
export default Loading;
