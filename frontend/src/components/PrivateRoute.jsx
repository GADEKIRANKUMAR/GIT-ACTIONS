import { Navigate, useLocation } from "react-router-dom";
import { useAuth } from "../context/AuthContext";

export default function PrivateRoute({ children, roles }) {
  const { user } = useAuth();
  const location = useLocation();

  if (!user) return <Navigate to="/login" replace state={{ from: location }} />;

  if (roles && roles.length > 0) {
    const hasRole = user.roles.some((r) => roles.includes(r));
    if (!hasRole) return <Navigate to="/" replace />;
  }

  return children;
}
