import { useAuth } from "../../context/authContext";
import { Navigate, useLocation } from "react-router-dom";

export default function RequireAuth({ children }) {
  const { user } = useAuth();
  const location = useLocation();

  // Check if user is set in context or if the token is in localStorage
  const tokenFromLocalStorage = localStorage.getItem("token");

  if (!user && !tokenFromLocalStorage) {
    // Redirect to login, preserving the page they tried to access
    return <Navigate to="/login" state={{ from: location }} replace />;
  }

  return children;
}
