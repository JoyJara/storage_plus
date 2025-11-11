import React from "react";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";

interface AdminRouteProps {
  children: React.JSX.Element;
}

const AdminRoute: React.FC<AdminRouteProps> = ({ children }) => {
  const { loggedIn, user } = useAuth();

  if (loggedIn === null) return <p>Cargando...</p>;
  if (!loggedIn || user?.role !== "admin") return <Navigate to="/" />;

  return children;
};

export default AdminRoute;
