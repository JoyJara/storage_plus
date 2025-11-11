import React from "react";
import { useNavigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
const API_URL = import.meta.env.VITE_API_URL;

export const Footer: React.FC = () => {
  return (
    <footer className="custom-green text-white text-center py-3 mt-auto">
      <div className="container">
        <p className="mb-0">
          &copy; 2025 Gestor de Inventario. Todos los derechos reservados.
        </p>
      </div>
    </footer>
  );
};

export const Navbar: React.FC = () => {
  const navigate = useNavigate();
  const { user } = useAuth();

  const handleLogout = async () => {
    await fetch(`${API_URL}/api/auth/logout`, {
      method: "POST",
      credentials: "include",
    });

    navigate("/"); // Redirige al login
  };

  const getRoleName = (role: string | number | undefined) => {
    if (role === "1" || role === 1) return "Gerente";
    if (role === "2" || role === 2) return "Cajero";
    return "Desconocido";
  };

  return (
    <>
      <nav className="navbar navbar-expand-lg navbar-dark custom-green">
        <div className="container-fluid">
          <span
            className="navbar-brand"
            role="button"
            style={{ cursor: "pointer" }}
            onClick={() => navigate("/dashboard")}
          >
            Gestor de Inventario
          </span>

          <button
            className="navbar-toggler"
            type="button"
            data-bs-toggle="collapse"
            data-bs-target="#menu_navegacion"
            aria-controls="menu_navegacion"
            aria-expanded="false"
            aria-label="Toggle navigation"
          >
            <span className="navbar-toggler-icon"></span>
          </button>

          <div className="collapse navbar-collapse" id="menu_navegacion">
            <ul className="navbar-nav ms-auto">
              <li className="nav-item">
                <a className="nav-link" href="/dashboard">
                  Inicio
                </a>
              </li>

              <li className="nav-item">
                <a className="nav-link" href="/contact">
                  Contacto
                </a>
              </li>

              <li className="nav-item">
                <button
                  className="btn btn-outline-light ms-2"
                  type="button"
                  data-bs-toggle="offcanvas"
                  data-bs-target="#userOffcanvas"
                  aria-controls="userOffcanvas"
                >
                  Sesión: {user?.username}
                </button>
              </li>
            </ul>
          </div>
        </div>
      </nav>

      {/* Offcanvas lateral con ancho reducido */}
      <div
        className="offcanvas offcanvas-end w-25"
        tabIndex={-1}
        id="userOffcanvas"
        aria-labelledby="userOffcanvasLabel"
      >
        <div className="offcanvas-header">
          <h5 className="offcanvas-title" id="userOffcanvasLabel">
            Datos del Empleado
          </h5>
          <button
            type="button"
            className="btn-close"
            data-bs-dismiss="offcanvas"
            aria-label="Cerrar"
          ></button>
        </div>
        <div className="offcanvas-body">
          <p>
            <strong>Usuario:</strong> {user?.username}
          </p>
          <p>
            <strong>Rol:</strong> {getRoleName(user?.role)}
          </p>
          <button onClick={handleLogout} className="btn btn-danger mt-3">
            Cerrar Sesión
          </button>
        </div>
      </div>
    </>
  );
};

export default Navbar;
