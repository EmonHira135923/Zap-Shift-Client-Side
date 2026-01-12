import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { RouterProvider } from "react-router/dom";
import Router from "../src/Router/Router";
import { ToastContainer } from "react-toastify";
import AuthContexts from "./Componets/context/AuthContexts";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";

const queryClient = new QueryClient();

createRoot(document.getElementById("root")).render(
  <StrictMode>
    <QueryClientProvider client={queryClient}>
      <AuthContexts>
        <RouterProvider router={Router}></RouterProvider>
        <ToastContainer autoClose={2000} />
      </AuthContexts>
    </QueryClientProvider>
  </StrictMode>
);
