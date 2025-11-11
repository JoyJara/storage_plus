import React, { useState, useEffect } from "react";

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

interface Props {
  user: Employee;
  onChange: (user: Employee) => void;
  onSubmit: (e: React.FormEvent) => void;
  onCancel: () => void;
  mode: "edit" | "add";
}

const UserForm: React.FC<Props> = ({
  user,
  onChange,
  onSubmit,
  onCancel,
  mode,
}) => {
  const [confirmPassword, setConfirmPassword] = useState("");
  const [passwordMismatch, setPasswordMismatch] = useState(false);

  // Verifica en tiempo real si coinciden
  useEffect(() => {
    if (mode === "add") {
      setPasswordMismatch(user.Password !== confirmPassword);
    }
  }, [user.Password, confirmPassword, mode]);

  const handleSubmit = (e: React.FormEvent) => {
    if (mode === "add" && passwordMismatch) {
      e.preventDefault();
      alert("Las contraseñas no coinciden.");
      return;
    }

    const message =
      mode === "add"
        ? "¿Estás seguro de agregar este usuario?"
        : "¿Deseas guardar los cambios del usuario?";
    if (window.confirm(message)) {
      onSubmit(e);
    } else {
      e.preventDefault();
    }
  };

  return (
    <div
      className="modal fade show d-block"
      tabIndex={-1}
      style={{ backgroundColor: "rgba(0,0,0,0.5)" }}
    >
      <div className="modal-dialog">
        <div className="modal-content">
          <form onSubmit={handleSubmit}>
            <div className="modal-header">
              <h5 className="modal-title">
                {mode === "add" ? "Agregar Usuario" : "Editar Usuario"}
              </h5>
              <button
                type="button"
                className="btn-close"
                onClick={onCancel}
              ></button>
            </div>
            <div className="modal-body">
              {/* Nombre */}
              <div className="mb-3">
                <label className="form-label">Nombre</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.Name}
                  onChange={(e) => onChange({ ...user, Name: e.target.value })}
                  required
                />
              </div>

              {/* Rol */}
              <div className="mb-3">
                <label className="form-label">Rol</label>
                <select
                  className="form-select"
                  value={user.Role}
                  onChange={(e) =>
                    onChange({ ...user, Role: parseInt(e.target.value) })
                  }
                  required
                >
                  <option value="">Selecciona un rol</option>
                  <option value={1}>Gerente</option>
                  <option value={2}>Cajero</option>
                </select>
              </div>

              {/* Teléfono */}
              <div className="mb-3">
                <label className="form-label">Teléfono</label>
                <input
                  type="tel"
                  className="form-control"
                  value={user.Phone}
                  onChange={(e) => onChange({ ...user, Phone: e.target.value })}
                  required
                />
              </div>

              {/* Usuario */}
              <div className="mb-3">
                <label className="form-label">Usuario</label>
                <input
                  type="text"
                  className="form-control"
                  value={user.User}
                  onChange={(e) => onChange({ ...user, User: e.target.value })}
                  required
                />
              </div>

              {/* Contraseña y Confirmar */}
              {mode === "add" && (
                <>
                  <div className="mb-3">
                    <label className="form-label">Contraseña</label>
                    <input
                      type="password"
                      className="form-control"
                      value={user.Password || ""}
                      onChange={(e) =>
                        onChange({ ...user, Password: e.target.value })
                      }
                      required
                    />
                  </div>

                  <div className="mb-3">
                    <label className="form-label">Confirmar Contraseña</label>
                    <input
                      type="password"
                      className={`form-control ${
                        passwordMismatch ? "is-invalid" : ""
                      }`}
                      value={confirmPassword}
                      onChange={(e) => setConfirmPassword(e.target.value)}
                      required
                    />
                    {passwordMismatch && (
                      <div className="invalid-feedback">
                        Las contraseñas no coinciden.
                      </div>
                    )}
                  </div>
                </>
              )}

              {/* Estado */}
              <div className="mb-3">
                <label className="form-label">Estado</label>
                <select
                  className="form-select"
                  value={user.Status}
                  onChange={(e) =>
                    onChange({ ...user, Status: parseInt(e.target.value) })
                  }
                  required
                >
                  <option value={1}>Activo</option>
                  <option value={0}>Inactivo</option>
                </select>
              </div>

              {/* Fecha contratación */}
              <div className="mb-3">
                <label className="form-label">Fecha de Contratación</label>
                <input
                  type="date"
                  className="form-control"
                  value={user.Hired.slice(0, 10)}
                  onChange={(e) => onChange({ ...user, Hired: e.target.value })}
                  required
                />
              </div>
            </div>

            <div className="modal-footer">
              <button
                type="submit"
                className="btn btn-primary"
                disabled={mode === "add" && passwordMismatch}
              >
                {mode === "add" ? "Agregar" : "Guardar"}
              </button>

              <button
                type="button"
                className="btn btn-secondary"
                onClick={onCancel}
              >
                Cancelar
              </button>
            </div>
          </form>
        </div>
      </div>
    </div>
  );
};

export default UserForm;
