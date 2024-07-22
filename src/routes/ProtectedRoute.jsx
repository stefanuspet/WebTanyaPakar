import { useNavigate, Outlet } from "react-router-dom";
import { useEffect, useState } from "react";

// eslint-disable-next-line react/prop-types
const ProtectedRoute = ({ children }) => {
  const navigate = useNavigate();
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  useEffect(() => {
    const token = localStorage.getItem("token");
    const role = localStorage.getItem("role");
    if (!token && !role) {
      setIsAuthenticated(false);
      navigate("/");
    } else {
      setIsAuthenticated(true);
    }
  }, [navigate]);

  return isAuthenticated && (children ? children : <Outlet />);
};

export default ProtectedRoute;
