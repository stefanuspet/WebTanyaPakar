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
import Pakar from "../pages/admin/Pakar/";
import Tenant from "../pages/admin/Tenant/index";
import LogTenant from "../pages/admin/LogTenant";
import LogTenantPengelola from "../pages/pengelola/LogTenantPengelola";
import CreateTenant from "../pages/admin/Tenant/CreateTenant";
import EditTenant from "../pages/admin/Tenant/EditTenant";
import CreatePakar from "../pages/admin/Pakar/CreatePakar";

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
    path: "dashboard-pengelola/logTenantPengelola",
    element: (
      <ProtectedRoute>
        <LogTenantPengelola />,
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
  {
    path: "dashboard-admin/pakar/create",
    element: (
      <ProtectedRoute>
        <CreatePakar />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/tenant",
    element: (
      <ProtectedRoute>
        <Tenant />,
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/tenant/create",
    element: (
      <ProtectedRoute>
        <CreateTenant />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/tenant/edit/:id",
    element: (
      <ProtectedRoute>
        <EditTenant />
      </ProtectedRoute>
    ),
  },
  {
    path: "dashboard-admin/logTenant",
    element: (
      <ProtectedRoute>
        <LogTenant />,
      </ProtectedRoute>
    ),
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
