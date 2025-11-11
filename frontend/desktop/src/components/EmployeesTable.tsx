import React from "react";

interface Employee {
  ID: number;
  Name: string;
  Role: number;
  Phone: string;
  User: string;
  Status: number;
  Hired: string;
}

interface Props {
  employees: Employee[];
  onEdit: (employee: Employee) => void;
  onDelete: (id: number) => void;
}

const EmployeesTable: React.FC<Props> = ({ employees, onEdit, onDelete }) => {
  const getRoleName = (role: number) => {
    return role === 1 ? "Gerente" : role === 2 ? "Cajero" : "Desconocido";
  };

  const getStatusLabel = (status: number) => {
    return status === 1 ? "Activo" : "Inactivo";
  };

  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Empleado</th>
          <th>Rol</th>
          <th>Teléfono</th>
          <th>Usuario</th>
          <th>Status</th>
          <th>Contratación</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {employees.map((item) => (
          <tr key={item.ID}>
            <td>{item.ID}</td>
            <td>{item.Name}</td>
            <td>{getRoleName(item.Role)}</td>
            <td>{item.Phone}</td>
            <td>{item.User}</td>
            <td>{getStatusLabel(item.Status)}</td>
            <td>{item.Hired.slice(0, 10)}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(item)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(item.ID)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default EmployeesTable;
