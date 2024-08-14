// LoadingPage.jsx
import React from 'react';

const LoadingPage = () => {
  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <div className="flex flex-col items-center">
        <div className="spinner-border animate-spin inline-block w-12 h-12 border-4 border-t-transparent border-blue-500 rounded-full" />
        <p className="mt-4 text-lg text-gray-700">Loading...</p>
      </div>
    </div>
  );
};

export default LoadingPage;
