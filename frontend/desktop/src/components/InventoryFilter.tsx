import React, { useEffect } from "react";
import * as bootstrap from "bootstrap";
import { Category } from "../utils/inventoryUtils";

interface FilterProps {
  filters: {
    name: string;
    id: string;
    barcode: string;
    category: string;
    priceMin: string;
    priceMax: string;
  };
  setFilters: React.Dispatch<
    React.SetStateAction<{
      name: string;
      id: string;
      barcode: string;
      category: string;
      priceMin: string;
      priceMax: string;
    }>
  >;
  categories: Category[];
}

const InventoryFilter: React.FC<FilterProps> = ({
  filters,
  setFilters,
  categories,
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
        <h5 className="me-2 mb-0">Filtrar Productos</h5>
        <span
          className="d-inline-block"
          tabIndex={0}
          data-bs-toggle="tooltip"
          data-bs-placement="right"
          title="Utiliza los filtros para buscar productos por nombre, categoría, código, precio, etc."
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
          <input
            type="text"
            className={getInputClass(filters.name)}
            placeholder="Nombre"
            value={filters.name}
            onChange={(e) => setFilters({ ...filters, name: e.target.value })}
          />
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="text"
            className={getInputClass(filters.barcode)}
            placeholder="Código de barras"
            value={filters.barcode}
            onChange={(e) =>
              setFilters({ ...filters, barcode: e.target.value })
            }
          />
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="text"
            className={getInputClass(filters.id)}
            placeholder="ID"
            value={filters.id}
            onChange={(e) => setFilters({ ...filters, id: e.target.value })}
          />
        </div>

        <div className="col-md-2 mb-2">
          <select
            className={getSelectClass(filters.category)}
            value={filters.category}
            onChange={(e) =>
              setFilters({ ...filters, category: e.target.value })
            }
          >
            <option value="">Categoría</option>
            {categories.map((cat) => (
              <option key={cat.id} value={cat.name}>
                {cat.name}
              </option>
            ))}
          </select>
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="number"
            className={getInputClass(filters.priceMin)}
            placeholder="Precio mín."
            value={filters.priceMin}
            onChange={(e) =>
              setFilters({ ...filters, priceMin: e.target.value })
            }
          />
        </div>

        <div className="col-md-2 mb-2">
          <input
            type="number"
            className={getInputClass(filters.priceMax)}
            placeholder="Precio máx."
            value={filters.priceMax}
            onChange={(e) =>
              setFilters({ ...filters, priceMax: e.target.value })
            }
          />
        </div>

        <div className="col-md-12 mt-2">
          <button
            className="btn btn-outline-secondary"
            onClick={() =>
              setFilters({
                name: "",
                id: "",
                barcode: "",
                category: "",
                priceMin: "",
                priceMax: "",
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

export default InventoryFilter;
