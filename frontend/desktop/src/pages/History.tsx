import React, { useEffect, useState } from "react";
import { Footer, Navbar } from "../components/HTML";
import HistoryTable from "../components/HistoryTable";
import HistoryFilter from "../components/HistoryFilter";

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

const History: React.FC = () => {
  const [history, setHistory] = useState<HistoryEntry[]>([]);
  const [loading, setLoading] = useState(true);
  const [filters, setFilters] = useState({
    type: "",
    action: "",
    context: "",
    transactionID: "",
    employeeName: "",
    date: "",
  });

  const [uniqueActions, setUniqueActions] = useState<string[]>([]);
  const [uniqueContexts, setUniqueContexts] = useState<string[]>([]);
  const [uniqueEmployees, setUniqueEmployees] = useState<string[]>([]);

  useEffect(() => {
    fetch("/api/history")
      .then((res) => res.json())
      .then((data: HistoryEntry[]) => {
        const sorted = data.sort((a, b) => b.transactionID - a.transactionID);
        setHistory(sorted);

        setUniqueActions([...new Set(data.map((entry) => entry.action))]);
        setUniqueContexts([...new Set(data.map((entry) => entry.context))]);
        setUniqueEmployees([
          ...new Set(data.map((entry) => entry.employeeName)),
        ]);

        setLoading(false);
      })
      .catch((err) => {
        console.error("Error al obtener historial:", err);
        setLoading(false);
      });
  }, []);

  const filteredHistory = history.filter((entry) => {
    const matchType =
      filters.type === "" ||
      entry.transactionType.toLowerCase() === filters.type.toLowerCase();
    const matchAction =
      filters.action === "" ||
      entry.action.toLowerCase() === filters.action.toLowerCase();
    const matchContext =
      filters.context === "" ||
      entry.context.toLowerCase() === filters.context.toLowerCase();
    const matchTransactionID =
      filters.transactionID === "" ||
      entry.transactionID.toString().includes(filters.transactionID);
    const matchEmployee =
      filters.employeeName === "" ||
      entry.employeeName.toLowerCase() === filters.employeeName.toLowerCase();
    const matchDate =
      filters.date === "" || entry.date.slice(0, 10) === filters.date;

    return (
      matchType &&
      matchAction &&
      matchContext &&
      matchTransactionID &&
      matchEmployee &&
      matchDate
    );
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="container mt-5 mb-5 flex-grow-1">
        <h1 className="mb-4">Historial de Transacciones</h1>

        {/* Barra de Filtros */}
        <HistoryFilter
          filters={filters}
          setFilters={setFilters}
          uniqueActions={uniqueActions}
          uniqueContexts={uniqueContexts}
          uniqueEmployees={uniqueEmployees}
        />

        {/* Tabla de Historial */}
        {loading ? (
          <p>Cargando historial...</p>
        ) : (
          <HistoryTable history={filteredHistory} />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default History;
