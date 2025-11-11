import React from "react";
import { Link } from "react-router-dom";
import { Footer, Navbar } from "../components/HTML";

const Dashboard: React.FC = () => {
  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="container mt-5 flex-grow-1">
        <h1 className="mb-4">Panel de Inicio</h1>
        <div className="row">
          {/* Tarjetas de navegación */}
          <div className="col-md-4">
            <div className="card text-center mb-3">
              <div className="card-body">
                <h5 className="card-title">Punto de Venta</h5>
                <p className="card-text">
                  Realiza ventas, devoluciones y más.
                </p>
                <Link to="/pos" className="btn btn-outline-success">
                  Ir a POS
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-3">
              <div className="card-body">
                <h5 className="card-title">Inventario</h5>
                <p className="card-text">
                  Consulta y gestiona el stock de productos.
                </p>
                <Link to="/inventory" className="btn btn-outline-success">
                  Ir a Inventario
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-3">
              <div className="card-body">
                <h5 className="card-title">Historial</h5>
                <p className="card-text">
                  Consulta el historial de transacciones.
                </p>
                <Link to="/history" className="btn btn-outline-success">
                  Ir a Historial
                </Link>
              </div>
            </div>
          </div>

          <div className="col-md-4">
            <div className="card text-center mb-3">
              <div className="card-body">
                <h5 className="card-title">Empleados</h5>
                <p className="card-text">
                  Visualiza y administra las cuentas de los empleados.
                </p>
                <Link to="/employees" className="btn btn-outline-success">
                  Ir a Empleados
                </Link>
              </div>
            </div>
          </div>

        </div>
      </main>

      <Footer />
    </div>
  );
};

export default Dashboard;
