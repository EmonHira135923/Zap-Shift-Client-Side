import React from "react";
import useAuth from "../Componets/hooks/useAuth";
import { Navigate, useLocation } from "react-router";

const PrivateRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const location = useLocation();

  if (loading) {
    return (
      <div className="min-h-screen flex items-center justify-center bg-gradient-to-br from-gray-50 via-white to-gray-100 dark:from-gray-900 dark:via-gray-800 dark:to-gray-950">
        <div className="relative">
          <div className="w-20 h-20 border-4 border-gray-200 dark:border-gray-700 rounded-full"></div>
          <div className="absolute top-0 left-0 w-20 h-20 border-4 border-transparent border-t-blue-600 dark:border-t-blue-400 border-r-cyan-500 dark:border-r-cyan-300 rounded-full animate-spin"></div>
          <div className="absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 w-3 h-3 bg-blue-600 dark:bg-blue-400 rounded-full"></div>
          <div className="mt-6 text-center">
            <p className="text-gray-700 dark:text-gray-300 font-medium mb-1">
              Loading
            </p>
            <p className="text-xs text-gray-500 dark:text-gray-400">
              Please wait...
            </p>
          </div>
        </div>
      </div>
    );
  }

  if (user) return children;

  return <Navigate state={location?.pathname} to={"/login"}></Navigate>;
};

export default PrivateRouter;
