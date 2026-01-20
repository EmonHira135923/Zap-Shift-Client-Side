import React from "react";
import useAuth from "../Componets/hooks/useAuth";
import useRole from "../Componets/hooks/useRole";
import ForbiddenPage from "../Componets/Shared/ForbiddenPage";

const AdminRouter = ({ children }) => {
  const { user, loading } = useAuth();
  const { role, isLoading } = useRole();

  if (loading || isLoading) return <div>Loading...</div>;

  if (user && role === "admin") {
    return children;
  }

  // console.log("role from ", role);

  return <ForbiddenPage />;
};

export default AdminRouter;
