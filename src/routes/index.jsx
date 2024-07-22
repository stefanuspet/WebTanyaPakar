import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../pages/Auth";
import ErrorPage from "../pages/ErrorPage";
// import ProtectedRoute from "./ProtectedRoute";
import Dashboard from "../pages/admin/Dashboard";
import Users from "../pages/admin/Users";
import Materi from "../pages/admin/Materi";
import DashboardPengelola from "../pages/pengelola/DashboardPengelola";
import ProtectedRoute from "./ProtectedRoute";
import Chats from "../pages/admin/Chats";
import Pakar from "../pages/admin/Pakar";

const router = createBrowserRouter([
  {
    path: "*",
    element: <ErrorPage />,
  },
  {
    path: "/",
    element: <Auth />,
  },
  {
    path: "/dashboard-pengelola",
    element: (
      <ProtectedRoute>
        <DashboardPengelola />,
      </ProtectedRoute>
    ),
  },
  {
    path: "/dashboard-admin",
    element: (
      <ProtectedRoute>
        <Dashboard />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/users",
    element: (
      <ProtectedRoute>
        <Users />,
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/materi",
    element: (
      <ProtectedRoute>
        <Materi />,
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/chats",
    element: (
      <ProtectedRoute>
        <Chats />,
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/pakar",
    element: (
      <ProtectedRoute>
        <Pakar />,
      </ProtectedRoute>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
