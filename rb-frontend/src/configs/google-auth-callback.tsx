import { useEffect } from "react";
import { useNavigate, useSearchParams } from "react-router-dom";
import api from "../configs/api";

const GoogleCallback = () => {
  const navigate = useNavigate();
  const [searchParams] = useSearchParams();

  useEffect(() => {
    const token = searchParams.get("token");
    const code = searchParams.get("code");

    const handleAuth = async () => {
      if (token) {
        localStorage.setItem("access_token", token);
        validateAndNavigate();
      } else if (code) {
        try {
          const response = await api.post("/auth/google/callback/", { code });
          localStorage.setItem("access_token", response.data.token);
          validateAndNavigate();
        } catch (error) {
          navigate("/auth/login");
        }
      } else {
        navigate("/auth/login");
      }
    };

    const validateAndNavigate = () => {
      api
        .get("/auth/user/")
        .then((response) => {
          response.data ? navigate("/@me") : navigate("/auth/login");
        })
        .catch(() => navigate("/auth/login"));
    };

    handleAuth();
  }, [navigate, searchParams]);

  return <p>Redirecting...</p>;
};

export default GoogleCallback;
