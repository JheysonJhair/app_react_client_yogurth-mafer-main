import { useEffect } from "react";
import { useNavigate } from "react-router-dom";

interface Props {
  children: React.ReactNode;
}

const ProtectedRoute = ({ children }: Props) => {
  const navigate = useNavigate();

  useEffect(() => {
    // Verificar el estado de autenticación en localStorage
    const isAuthenticated = localStorage.getItem("isAuthenticated") === "true";

    if (!isAuthenticated) {
      navigate("/login");
    }
  }, [navigate]);

  // Renderizar los hijos si el usuario está autenticado, de lo contrario, no renderizar nada
  return localStorage.getItem("isAuthenticated") === "true" ? children : null;
};

export default ProtectedRoute;
