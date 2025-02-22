import { Route, Routes } from "react-router-dom";
import Login from "../pages/auth/login";
import Register from "../pages/auth/register";
import ForgotPassword from "../pages/auth/forgot-password";

function AuthRoutes() {
  return (
    <Routes>
      <Route path="/login" element={<Login />} />
      <Route path="/register" element={<Register />} />
      <Route path="/forgot-password" element={<ForgotPassword />} />
    </Routes>
  );
}

export default AuthRoutes;
