import { StrictMode } from "react";
import { createRoot } from "react-dom/client";
import "./index.css";
import { Toaster } from "react-hot-toast";
import {
  createBrowserRouter,
  createRoutesFromElements,
  Navigate,
  Route,
  RouterProvider,
} from "react-router-dom";
import { EmployeesPage } from "./pages/index.ts";
import { CoreProvider } from "./context/core-context.tsx";

const router = createBrowserRouter(
  createRoutesFromElements(
    <>
      <Route path="/" element={<Navigate to="/employees" />} />
      <Route path="/employees" element={<EmployeesPage />} />
    </>
  )
);

createRoot(document.getElementById("root")!).render(
  <StrictMode>
    <CoreProvider>
      <Toaster toastOptions={{ style: { fontSize: 14 } }} />
      <RouterProvider router={router} />
    </CoreProvider>
  </StrictMode>
);
