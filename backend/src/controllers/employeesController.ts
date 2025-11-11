import { Response } from "express";
import { InventoryDB } from "../db/connection";
import bcrypt from "bcrypt";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

// 🔹 Obtener empleados
export const GetEmployees = (_req: AuthenticatedRequest, res: Response) => {
  InventoryDB.query(`SELECT * FROM employeesView`, (err, results) => {
    if (err) return res.status(500).send("Error en el servidor.");
    res.json(results);
  });
};

// 🔹 Agregar empleado
export const AddEmployee = async (req: AuthenticatedRequest, res: Response) => {
  try {
    const { name, phone, role, hiringDate, username, password, status } = req.body;
    const executorID = req.user?.id;

    if (!executorID) return res.status(401).json({ success: false, error: "Empleado no autenticado" });

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `CALL inventario.addUser(?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [name, phone, parseInt(role), hiringDate, username, hashedPassword, parseInt(status), executorID];

    InventoryDB.query(sql, params, (err) => {
      if (err) {
        console.error("Error al agregar empleado:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, message: "Empleado agregado correctamente." });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// 🔹 Editar empleado
export const EditEmployee = (req: AuthenticatedRequest, res: Response) => {
  const { employeeID, name, phone, role, hiringDate, username, status } = req.body;
  const executorID = req.user?.id;

  if (!executorID) return res.status(401).json({ success: false, error: "Empleado no autenticado" });

  const sql = `CALL inventario.editUser(?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [employeeID, name, phone, parseInt(role), hiringDate, username, parseInt(status), executorID];

  InventoryDB.query(sql, params, (err) => {
    if (err) {
      console.error("Error al editar empleado:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Empleado actualizado correctamente." });
  });
};

// 🔹 Eliminar empleado
export const DeleteEmployee = (req: AuthenticatedRequest, res: Response) => {
  const { id } = req.params;
  const executorID = req.user?.id;

  if (!executorID) return res.status(401).json({ success: false, error: "Empleado no autenticado" });

  const sql = `CALL inventario.deleteUser(?, ?)`;
  InventoryDB.query(sql, [parseInt(id), executorID], (err) => {
    if (err) {
      console.error("Error al eliminar empleado:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Empleado eliminado correctamente." });
  });
};
