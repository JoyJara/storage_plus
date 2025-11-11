import React, { useEffect, useState } from "react";

interface HistoryEntry {
  transactionID: number;
  transactionType: string;
  action: string;
  context: string;
  entity: string | null;
  productID: number | null;
  quantity: number | null;
  employeeName: string;
  date: string;
}

interface Product {
  productID: number;
  name: string;
}

interface Props {
  history: HistoryEntry[];
}

const getBadgeClassByTransactionType = (type: string) => {
  switch (type.toLowerCase()) {
    case "punto de venta":
      return "badge bg-success";
    case "sistema":
      return "badge bg-warning";
    default:
      return "badge bg-secondary";
  }
};

const HistoryTable: React.FC<Props> = ({ history }) => {
  const [products, setProducts] = useState<Product[]>([]);
  const [expandedRows, setExpandedRows] = useState<number[]>([]);

  useEffect(() => {
    fetch("/api/history/products")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error al cargar productos:", err));
  }, []);

  const toggleRow = (id: number) => {
    setExpandedRows((prev) =>
      prev.includes(id) ? prev.filter((i) => i !== id) : [...prev, id]
    );
  };

  const getProductName = (id: number | null): string | null => {
    if (id === null) return null;
    const product = products.find((p) => p.productID === id);
    return product ? product.name : null;
  };

  // Agrupar por transactionID
  const groupedHistory = history.reduce((acc, entry) => {
    if (!acc[entry.transactionID]) {
      acc[entry.transactionID] = {
        ...entry,
        products: entry.productID
          ? [{ productID: entry.productID, quantity: entry.quantity }]
          : [],
      };
    } else {
      if (entry.productID) {
        acc[entry.transactionID].products.push({
          productID: entry.productID,
          quantity: entry.quantity,
        });
      }
    }
    return acc;
  }, {} as Record<number, HistoryEntry & { products: { productID: number; quantity: number | null }[] }>);

  const groupedEntries = Object.values(groupedHistory).sort(
    (a, b) => b.transactionID - a.transactionID
  );

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Tipo</th>
          <th>Acción</th>
          <th>Contexto</th>
          <th>Empleado</th>
          <th>Fecha</th>
          <th>Detalles</th>
        </tr>
      </thead>
      <tbody>
        {groupedEntries.map((entry) => {
          const productDetails = entry.products
            .map((p) => {
              const name = getProductName(p.productID);
              return name ? `${name} (x${p.quantity ?? 0})` : null;
            })
            .filter((x): x is string => !!x);

          const hasProducts = productDetails.length > 0;
          const hasEntity = !!entry.entity;

          return (
            <React.Fragment key={entry.transactionID}>
              <tr>
                <td>{entry.transactionID}</td>
                <td>
                  <span
                    className={getBadgeClassByTransactionType(
                      entry.transactionType
                    )}
                  >
                    {entry.transactionType}
                  </span>
                </td>
                <td>{entry.action}</td>
                <td>{entry.context}</td>
                <td>{entry.employeeName}</td>
                <td>{new Date(entry.date).toLocaleString()}</td>
                <td>
                  {(hasProducts || hasEntity) && (
                    <button
                      className="btn btn-sm btn-outline-secondary"
                      onClick={() => toggleRow(entry.transactionID)}
                    >
                      {expandedRows.includes(entry.transactionID)
                        ? "Ocultar"
                        : "Ver"}
                    </button>
                  )}
                </td>
              </tr>

              {expandedRows.includes(entry.transactionID) &&
                (hasProducts || hasEntity) && (
                  <tr>
                    <td colSpan={7}>
                      <div className="p-2 bg-light rounded">
                        {hasProducts && (
                          <>
                            <strong>Productos:</strong>
                            <ul className="mb-1">
                              {productDetails.map((line, idx) => (
                                <li key={idx}>{line}</li>
                              ))}
                            </ul>
                          </>
                        )}
                        {hasEntity && (
                          <>
                            <strong>Entidad:</strong> {entry.entity}
                          </>
                        )}
                      </div>
                    </td>
                  </tr>
                )}
            </React.Fragment>
          );
        })}
      </tbody>
    </table>
  );
};

export default HistoryTable;
