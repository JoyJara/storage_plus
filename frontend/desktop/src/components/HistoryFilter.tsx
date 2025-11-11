import React, { useEffect } from "react";
import * as bootstrap from "bootstrap";

interface FilterProps {
  filters: {
    type: string;
    action: string;
    context: string;
    transactionID: string;
    employeeName: string;
    date: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      type: string;
      action: string;
      context: string;
      transactionID: string;
      employeeName: string;
      date: string;
    }>
  >;
  uniqueActions: string[];
  uniqueContexts: string[];
  uniqueEmployees: string[];
}

const HistoryFilter: React.FC<FilterProps> = ({
  filters,
  setFilters,
  uniqueActions,
  uniqueContexts,
  uniqueEmployees,
}) => {
  useEffect(() => {
    const tooltipTriggerList = Array.from(
      document.querySelectorAll('[data-bs-toggle="tooltip"]')
    );
    tooltipTriggerList.forEach(
      (tooltipTriggerEl) => new bootstrap.Tooltip(tooltipTriggerEl)
    );
  }, []);

  const getInputClass = (value: string) =>
    value ? "form-control text-success border-success" : "form-control";

  const getSelectClass = (value: string) =>
    value ? "form-select text-success border-success" : "form-select";

  return (
    <div className="card p-3 mb-4">
      <div className="d-flex align-items-center mb-2">
        <h5 className="me-2 mb-0">Filtrar Historial</h5>
        <span
          className="d-inline-block"
          tabIndex={0}
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Aplica filtros para refinar los resultados del historial."
          style={{
            width: "20px",
            height: "20px",
            borderRadius: "50%",
            backgroundColor: "#6c757d",
            color: "white",
            textAlign: "center",
            fontSize: "14px",
            lineHeight: "20px",
            cursor: "pointer",
          }}
        >
          ?
        </span>
      </div>

      <div className="row">
        <div className="col-md-2 mb-2">
          <select
            className={getSelectClass(filters.type)}
            value={filters.type}
            onChange={(e) => setFilters({ ...filters, type: e.target.value })}
          >
            <option value="">Transacción</option>
            <option value="Punto de Venta">Punto de Venta</option>
            <option value="Sistema">Sistema</option>
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <select
            className={getSelectClass(filters.action)}
            value={filters.action}
            onChange={(e) => setFilters({ ...filters, action: e.target.value })}
          >
            <option value="">Acción</option>
            {uniqueActions.map((action, idx) => (
              <option key={idx} value={action}>
                {action}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <select
            className={getSelectClass(filters.context)}
            value={filters.context}
            onChange={(e) =>
              setFilters({ ...filters, context: e.target.value })
            }
          >
            <option value="">Contexto</option>
            {uniqueContexts.map((ctx, idx) => (
              <option key={idx} value={ctx}>
                {ctx}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="text"
            className={getInputClass(filters.transactionID)}
            placeholder="Transaction ID"
            value={filters.transactionID}
            onChange={(e) =>
              setFilters({ ...filters, transactionID: e.target.value })
            }
          />
        </div>

        <div className="col-md-2 mb-2">
          <select
            className={getSelectClass(filters.employeeName)}
            value={filters.employeeName}
            onChange={(e) =>
              setFilters({ ...filters, employeeName: e.target.value })
            }
          >
            <option value="">Empleado</option>
            {uniqueEmployees.map((emp, idx) => (
              <option key={idx} value={emp}>
                {emp}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="date"
            className={getInputClass(filters.date)}
            value={filters.date}
            onChange={(e) => setFilters({ ...filters, date: e.target.value })}
          />
        </div>

        <div className="col-md-2 mb-2 d-flex align-items-center">
          <button
            className="btn btn-outline-secondary w-100"
            onClick={() =>
              setFilters({
                type: "",
                action: "",
                context: "",
                transactionID: "",
                employeeName: "",
                date: "",
              })
            }
          >
            Limpiar filtros
          </button>
        </div>
      </div>
    </div>
  );
};

export default HistoryFilter;
