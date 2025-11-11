import React, { useEffect, useState } from "react";
import EmployeesTable from "../components/EmployeesTable";
import UserForm from "../components/UserForm";
import { Footer, Navbar } from "../components/HTML";

interface Employee {
  ID: number;
  Name: string;
  Role: number;
  Phone: string;
  User: string;
  Status: number;
  Hired: string;
  Password?: string;
}

const createEmptyUser = (): Employee => ({
  ID: 0,
  Name: "",
  Role: 1,
  Phone: "",
  User: "",
  Status: 1,
  Hired: new Date().toISOString().slice(0, 10),
  Password: "",
});

const Employees: React.FC = () => {
  const [employees, setEmployees] = useState<Employee[]>([]);
  const [loading, setLoading] = useState(true);
  const [editingUser, setEditingUser] = useState<Employee | null>(null);
  const [addingUser, setAddingUser] = useState(false);
  const [filters, setFilters] = useState({
    name: "",
    username: "",
    phone: "",
    role: "",
    status: "",
  });

  const roles: { [key: number]: string } = {
    1: "Gerente",
    2: "Cajero",
  };

  useEffect(() => {
    const fetchEmployees = () => {
      setLoading(true);
      fetch("/api/employees")
        .then((res) => res.json())
        .then((data) => {
          setEmployees(data);
          setLoading(false);
        })
        .catch((err) => {
          console.error("Error al obtener los empleados:", err);
          setLoading(false);
        });
    };

    fetchEmployees();
  }, []);

  const handleDelete = (id: number) => {
    if (!confirm("¿Estás seguro de eliminar este empleado?")) return;

    fetch(`/api/employees/${id}`, {
      method: "DELETE",
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setEmployees((prev) => prev.filter((e) => e.ID !== id));
        } else {
          alert("Error al eliminar: " + (data.error || "Error desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al eliminar el empleado:", err);
        alert("Ocurrió un error al conectar con el servidor");
      });
  };

  const handleEdit = (employee: Employee) => {
    setEditingUser(employee);
    setAddingUser(false);
  };

  const handleFormSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    if (!editingUser) return;

    const method = addingUser ? "POST" : "PUT";
    const url = "/api/employees";

    const body = JSON.stringify({
      employeeID: editingUser.ID,
      name: editingUser.Name,
      role: editingUser.Role,
      phone: editingUser.Phone,
      username: editingUser.User,
      status: editingUser.Status,
      hiringDate: editingUser.Hired.slice(0, 10),
      ...(addingUser && { password: editingUser.Password || "" }),
    });

    fetch(url, {
      method,
      headers: { "Content-Type": "application/json" },
      body,
    })
      .then((res) => res.json())
      .then((data) => {
        if (data.success) {
          setAddingUser(false);
          setEditingUser(null);
          fetch("/api/employees")
            .then((res) => res.json())
            .then((data) => setEmployees(data));
        } else {
          alert("Error: " + (data.error || "Error desconocido"));
        }
      })
      .catch((err) => {
        console.error("Error al enviar el formulario:", err);
        alert("Ocurrió un error en el servidor");
      });
  };

  const filteredEmployees = employees.filter((emp) => {
    const matchName =
      filters.name === "" ||
      emp.Name.toLowerCase().includes(filters.name.toLowerCase());
    const matchUsername =
      filters.username === "" ||
      emp.User.toLowerCase().includes(filters.username.toLowerCase());
    const matchPhone =
      filters.phone === "" || emp.Phone.includes(filters.phone);
    const matchRole =
      filters.role === "" || emp.Role.toString() === filters.role;
    const matchStatus =
      filters.status === "" ||
      (filters.status === "activo" && emp.Status === 1) ||
      (filters.status === "inactivo" && emp.Status === 0);

    return matchName && matchUsername && matchPhone && matchRole && matchStatus;
  });

  return (
    <div className="d-flex flex-column min-vh-100">
      <Navbar />

      <main className="content container mt-5 mb-5 flex-grow-1">
        <div className="d-flex align-items-center mb-4">
          <h1 className="mb-0">Empleados</h1>
          <button
            className="btn custom-green-btn ms-3"
            onClick={() => {
              setEditingUser(createEmptyUser());
              setAddingUser(true);
            }}
          >
            Agregar Usuario
          </button>
        </div>

        {/* Barra de Filtros */}
        <div className="card p-3 mb-4">
          <h5>Filtrar Empleados</h5>
          <div className="row">
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Nombre"
                value={filters.name}
                onChange={(e) =>
                  setFilters({ ...filters, name: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Usuario"
                value={filters.username}
                onChange={(e) =>
                  setFilters({ ...filters, username: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <input
                type="text"
                className="form-control"
                placeholder="Teléfono"
                value={filters.phone}
                onChange={(e) =>
                  setFilters({ ...filters, phone: e.target.value })
                }
              />
            </div>
            <div className="col-md-2 mb-2">
              <select
                className="form-select"
                value={filters.role}
                onChange={(e) =>
                  setFilters({ ...filters, role: e.target.value })
                }
              >
                <option value="">Rol</option>
                {Object.entries(roles).map(([key, label]) => (
                  <option key={key} value={key}>
                    {label}
                  </option>
                ))}
              </select>
            </div>
            <div className="col-md-2 mb-2">
              <select
                className="form-select"
                value={filters.status}
                onChange={(e) =>
                  setFilters({ ...filters, status: e.target.value })
                }
              >
                <option value="">Status</option>
                <option value="activo">Activo</option>
                <option value="inactivo">Inactivo</option>
              </select>
            </div>
            <div className="col-md-2 mb-2 d-flex align-items-center">
              <button
                className="btn btn-outline-secondary w-100"
                onClick={() =>
                  setFilters({
                    name: "",
                    username: "",
                    phone: "",
                    role: "",
                    status: "",
                  })
                }
              >
                Limpiar filtros
              </button>
            </div>
          </div>
        </div>

        {/* Tabla de Empleados */}
        {loading ? (
          <p>Cargando empleados...</p>
        ) : (
          <EmployeesTable
            employees={filteredEmployees}
            onEdit={handleEdit}
            onDelete={handleDelete}
          />
        )}

        {/* Formulario */}
        {editingUser && (
          <UserForm
            user={editingUser}
            onChange={setEditingUser}
            onSubmit={handleFormSubmit}
            onCancel={() => {
              setEditingUser(null);
              setAddingUser(false);
            }}
            mode={addingUser ? "add" : "edit"}
          />
        )}
      </main>

      <Footer />
    </div>
  );
};

export default Employees;
