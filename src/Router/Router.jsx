import { createBrowserRouter } from "react-router";
import Root from "../layout/Root.jsx";
import Login from "../Pages/auth/Login.jsx";
import Registration from "../Pages/auth/Registration.jsx";
import Home from "../Pages/Home.jsx";
import ErrorPage from "../Pages/ErrorPage.jsx";
import Coverages from "../Pages/Coverages.jsx";
import AuthLayout from "../layout/AuthLayout.jsx";
import Aboutus from "../Pages/Aboutus.jsx";
import Services from "../Pages/Services.jsx";
import Pricing from "../Pages/Pricing.jsx";
import BeRider from "../Pages/BeRider.jsx";

const Router = createBrowserRouter([
  // Root Layout
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services },
      { path: "coverage", Component: Coverages },
      { path: "about", Component: Aboutus },
      { path: "pricing", Component: Pricing },
      { path: "rider", Component: BeRider },
    ],
  },
  // Auth Layout
  {
    path: "auth",
    Component: AuthLayout,
    errorElement: <ErrorPage />,
    children: [
      { path: "login", Component: Login },
      { path: "register", Component: Registration },
    ],
  },
]);

export default Router;
