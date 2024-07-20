import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../pages/Auth";
import ErrorPage from "../pages/ErrorPage";
// import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";

const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/login",
    element: <Auth />,
  },
  {
    path: "/dashboard-admin",
    element: (
      // <ProtectedRoute>
      <Dashboard />
      // </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/users",
    element: <Users />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
