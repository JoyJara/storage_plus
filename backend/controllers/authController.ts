import { Request, Response } from "express";
import { InventoryDB } from "../db/connection";
import bcrypt from "bcrypt";

// Iniciar sesión
export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM employees WHERE username = ?";
  InventoryDB.query(query, [username], async (err, results: any[]) => {
    if (err)
      return res.status(500).json({ error: "Error interno del servidor" });
    if (results.length === 0)
      return res.status(401).json({ message: "Usuario no encontrado" });

    const employee = results[0];
    console.log("Tipo de employee.role:", typeof employee.role);

    const match = await bcrypt.compare(password, employee.password);
    if (!match)
      return res.status(401).json({ message: "Contraseña incorrecta" });

    // Guardar datos en sesión
    req.session.user = {
      id: employee.employeeID,
      username: employee.username,
      role: employee.role,
    };

    return res.status(200).json({ message: "Inicio de sesión exitoso" });
  });
};

// Cerrar sesión
export const logoutUser = (req: Request, res: Response) => {
  req.session.destroy((err) => {
    if (err) return res.status(500).json({ message: "Error al cerrar sesión" });

    res.clearCookie("connect.sid");
    return res.status(200).json({ message: "Sesión cerrada correctamente" });
  });
};

// Verificar si hay sesión activa
export const checkSession = (req: Request, res: Response) => {
  if (req.session.user) {
    res.status(200).json({
      loggedIn: true,
      user: req.session.user,
    });
  } else {
    res.status(200).json({ loggedIn: false });
  }
};
