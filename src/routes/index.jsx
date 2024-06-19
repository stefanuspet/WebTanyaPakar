import { createBrowserRouter, RouterProvider } from "react-router-dom";
import Auth from "../pages/Auth";

const router = createBrowserRouter([
  {
    path: "*",
    element: <div>404 Not Found !</div>,
  },
  {
    path: "/",
    element: <Auth />,
  },
]);

const AppRouter = () => {
  return <RouterProvider router={router} />;
};

export default AppRouter;
