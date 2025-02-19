import { BrowserRouter as AppRouter, Routes, Route } from "react-router-dom";
import Home from "./Home";

const Router = () => {
  return (
    <AppRouter>
      <Routes>
        <Route path="/" element={<Home />} />
      </Routes>
    </AppRouter>
  );
};

export default Router;
