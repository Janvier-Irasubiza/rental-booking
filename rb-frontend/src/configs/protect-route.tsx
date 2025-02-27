import { Navigate, Outlet } from "react-router-dom";

const ProtectedRoute = () => {
  const token = localStorage.getItem("access_token");

  return token ? <Outlet /> : <Navigate to="/auth/login" replace />;
};

export default ProtectedRoute;
