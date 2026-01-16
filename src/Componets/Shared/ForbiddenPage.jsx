import React from "react";
import { useNavigate } from "react-router";

const ForbiddenPage = () => {
  const navigate = useNavigate();

  return (
    <div className="min-h-screen bg-gradient-to-br from-gray-900 to-black text-white flex flex-col items-center justify-center p-6">
      <div className="max-w-md w-full text-center">
        {/* Error Code */}
        <div className="text-9xl font-bold mb-2">
          <span className="bg-gradient-to-r from-red-500 to-purple-600 bg-clip-text text-transparent">
            403
          </span>
        </div>

        {/* Icon */}
        <div className="mb-6">
          <div className="w-24 h-24 mx-auto rounded-full bg-gradient-to-br from-red-900/30 to-purple-900/30 flex items-center justify-center border border-red-500/20">
            <svg
              className="w-12 h-12 text-red-400"
              fill="currentColor"
              viewBox="0 0 20 20"
              xmlns="http://www.w3.org/2000/svg"
            >
              <path
                fillRule="evenodd"
                d="M13.477 14.89A6 6 0 015.11 6.524l8.367 8.368zm1.414-1.414L6.524 5.11a6 6 0 018.367 8.367zM18 10a8 8 0 11-16 0 8 8 0 0116 0z"
                clipRule="evenodd"
              />
            </svg>
          </div>
        </div>

        {/* Title */}
        <h1 className="text-3xl font-bold mb-3 text-gray-100">Access Denied</h1>

        {/* Description */}
        <p className="text-gray-400 mb-8 text-lg leading-relaxed">
          You don't have permission to access this resource. Please contact your
          administrator if you believe this is an error.
        </p>

        {/* Buttons Container */}
        <div className="flex flex-col sm:flex-row gap-4 justify-center">
          <button
            onClick={() => navigate("/")}
            className="px-6 py-3 bg-gradient-to-r from-gray-800 to-gray-900 border border-gray-700 rounded-lg font-medium hover:from-gray-700 hover:to-gray-800 transition-all duration-300 hover:border-gray-600 hover:shadow-lg hover:shadow-gray-900/50 focus:outline-none focus:ring-2 focus:ring-gray-700 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M10 19l-7-7m0 0l7-7m-7 7h18"
                />
              </svg>
              Go Back Home
            </div>
          </button>

          <button
            onClick={() => navigate("/dashboard")}
            className="px-6 py-3 bg-gradient-to-r from-purple-700 to-purple-800 border border-purple-600 rounded-lg font-medium hover:from-purple-600 hover:to-purple-700 transition-all duration-300 hover:border-purple-500 hover:shadow-lg hover:shadow-purple-900/50 focus:outline-none focus:ring-2 focus:ring-purple-700 focus:ring-offset-2 focus:ring-offset-gray-900"
          >
            <div className="flex items-center justify-center gap-2">
              <svg
                className="w-5 h-5"
                fill="none"
                stroke="currentColor"
                viewBox="0 0 24 24"
              >
                <path
                  strokeLinecap="round"
                  strokeLinejoin="round"
                  strokeWidth={2}
                  d="M3 12l2-2m0 0l7-7 7 7M5 10v10a1 1 0 001 1h3m10-11l2 2m-2-2v10a1 1 0 01-1 1h-3m-6 0a1 1 0 001-1v-4a1 1 0 011-1h2a1 1 0 011 1v4a1 1 0 001 1m-6 0h6"
                />
              </svg>
              Go to Dashboard
            </div>
          </button>
        </div>

        {/* Additional Help Text */}
        <p className="mt-10 text-sm text-gray-500">
          Error Code: 403 Forbidden • You may need proper authorization
        </p>
      </div>
    </div>
  );
};

export default ForbiddenPage;
