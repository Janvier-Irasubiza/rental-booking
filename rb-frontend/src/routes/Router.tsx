import { BrowserRouter as AppRouter, Routes, Route } from "react-router-dom";
import Home from "../pages/Home";
import Auth from "../pages/auth";
import Dashboard from "../portal/dashboard";

const Router = () => {
  return (
    <AppRouter>
      <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/auth" element={<Auth />} />
        <Route path="/dashboard" element={<Dashboard />} />
      </Routes>
    </AppRouter>
  );
};

export default Router;
