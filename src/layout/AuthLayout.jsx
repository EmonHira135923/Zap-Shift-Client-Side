import React from "react";
// import Navvar from "../Componets/Shared/Navvar";
import { Outlet } from "react-router";

const AuthLayout = () => {
  return (
    <div>
      {/* <Navvar /> */}
      <Outlet />
    </div>
  );
};

export default AuthLayout;
