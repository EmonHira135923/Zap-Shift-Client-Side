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
import PrivateRouter from "./PrivateRouter.jsx";
import DashboardLayout from "../layout/DashboardLayout.jsx";
import Mypercel from "../Pages/Dashboards/Mypercel.jsx";
import DashBoard from "../Pages/Dashboards/Dashboard.jsx";
import Payments from "../Pages/Dashboards/Payments.jsx";
import PaymentSuccess from "../Pages/Dashboards/PaymentSuccess.jsx";
import PaymentCancel from "../Pages/Dashboards/PaymentCancel.jsx";
import PaymentHistorys from "../Pages/Dashboards/PaymentHistorys.jsx";

const Router = createBrowserRouter([
  // Root Layout
  {
    path: "/",
    Component: Root,
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: Home },
      { path: "services", Component: Services }, // Send a Percel
      { path: "coverage", Component: Coverages },
      { path: "about", Component: Aboutus },
      {
        path: "pricing",
        element: (
          <PrivateRouter>
            <Pricing />
          </PrivateRouter>
        ),
      }, // Track a Order
      {
        path: "rider",
        element: (
          <PrivateRouter>
            <BeRider />
          </PrivateRouter>
        ),
      },
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
  // Dashboard Layout
  {
    path: "/dashboard",
    element: (
      <PrivateRouter>
        <DashboardLayout />
      </PrivateRouter>
    ),
    errorElement: <ErrorPage />,
    children: [
      { index: true, Component: DashBoard },
      { path: "mypercels", Component: Mypercel },
      { path: "payments/:id", Component: Payments },
      { path: "payments/success", Component: PaymentSuccess },
      { path: "payments/cancel", Component: PaymentCancel },
      { path: "payment-history", Component: PaymentHistorys },
    ],
  },
]);

export default Router;
