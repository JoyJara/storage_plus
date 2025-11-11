import React from "react";
import { useAuth } from "../hooks/useAuth";
import { Navigate } from "react-router-dom";

interface PrivateRouteProps {
  children: React.JSX.Element;
}

const PrivateRoute: React.FC<PrivateRouteProps> = ({ children }) => {
  const auth = useAuth();

  if (auth.loggedIn === null) return <p>Cargando...</p>;
  if (!auth.loggedIn) return <Navigate to="/" />;

  return children;
};

export default PrivateRoute;
