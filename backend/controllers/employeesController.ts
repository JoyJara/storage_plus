import { Request, Response } from "express";
import { InventoryDB } from "../db/connection";
import bcrypt from "bcrypt";

// Obtener la vista de empleados
export const GetEmployees = (req: Request, res: Response) => {
  InventoryDB.query(`SELECT * FROM employeesView`, (err, results) => {
    if (err) {
      return res.status(500).send("Error en el servidor.");
    }
    res.json(results);
  });
};

// Agregar un nuevo empleado (con historial)
export const AddEmployee = async (req: Request, res: Response) => {
  try {
    const { name, phone, role, hiringDate, username, password, status } =
      req.body;
    const executorID = req.session?.user?.id;

    if (!executorID || isNaN(executorID)) {
      res
        .status(401)
        .json({ success: false, error: "Empleado no autenticado" });
    }

    const hashedPassword = await bcrypt.hash(password, 10);

    const sql = `CALL inventario.addUser(?, ?, ?, ?, ?, ?, ?, ?)`;
    const params = [
      name,
      phone,
      parseInt(role),
      hiringDate,
      username,
      hashedPassword,
      parseInt(status),
      executorID,
    ];

    InventoryDB.query(sql, params, (err, results) => {
      if (err) {
        console.error("Error al agregar el empleado:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, message: "Empleado agregado correctamente." });
    });
  } catch (error: any) {
    res.status(500).json({ success: false, error: error.message });
  }
};

// Editar empleado existente (con historial)
export const EditEmployee = (req: Request, res: Response) => {
  const { employeeID, name, phone, role, hiringDate, username, status } =
    req.body;
  const executorID = req.session?.user?.id;

  if (!executorID || isNaN(executorID)) {
    res.status(401).json({ success: false, error: "Empleado no autenticado" });
  }

  if (
    !employeeID ||
    !name ||
    !phone ||
    role === undefined ||
    !hiringDate ||
    !username ||
    status === undefined
  ) {
    res.status(400).json({
      success: false,
      error: "Faltan campos requeridos para actualizar el empleado.",
    });
  }

  const sql = `CALL inventario.editUser(?, ?, ?, ?, ?, ?, ?, ?)`;
  const params = [
    employeeID,
    name,
    phone,
    parseInt(role),
    hiringDate,
    username,
    parseInt(status),
    executorID,
  ];

  InventoryDB.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error al editar el empleado:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: "Empleado actualizado correctamente." });
  });
};

// Eliminar empleado (con historial)
export const DeleteEmployee = (req: Request, res: Response) => {
  const { id } = req.params;
  const executorID = req.session?.user?.id;

  if (!executorID || isNaN(executorID)) {
    res.status(401).json({ success: false, error: "Empleado no autenticado" });
  }

  if (!id) {
    res.status(400).json({
      success: false,
      error: "Falta el parámetro 'id' para eliminar el empleado.",
    });
  }

  const sql = `CALL inventario.deleteUser(?, ?)`;
  const params = [parseInt(id), executorID];

  InventoryDB.query(sql, params, (err, results) => {
    if (err) {
      console.error("Error al eliminar el empleado:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: "Empleado eliminado correctamente." });
  });
};
