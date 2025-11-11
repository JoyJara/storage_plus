import { Request, Response } from "express";
import { InventoryDB } from "../db/connection";
import bcrypt from "bcrypt";
import jwt from "jsonwebtoken";

const JWT_SECRET = process.env.JWT_SECRET || "fallback_secret";

// 🔹 Iniciar sesión
export const loginUser = (req: Request, res: Response) => {
  const { username, password } = req.body;

  const query = "SELECT * FROM employees WHERE username = ?";
  InventoryDB.query(query, [username], async (err, results: any[]) => {
    if (err) {
      console.error("Error en la consulta:", err);
      return res.status(500).json({ success: false, message: "Error interno del servidor" });
    }

    if (results.length === 0) {
      return res.status(401).json({ success: false, message: "Usuario no encontrado" });
    }

    const employee = results[0];
    const match = await bcrypt.compare(password, employee.password);

    if (!match) {
      return res.status(401).json({ success: false, message: "Contraseña incorrecta" });
    }

    const user = {
      id: employee.employeeID,
      username: employee.username,
      role: employee.role,
    };

    // ✅ Generar token JWT
    const token = jwt.sign(user, JWT_SECRET, { expiresIn: "2h" });

    console.log("✅ Usuario autenticado:", user);

    return res.status(200).json({
      success: true,
      message: "Inicio de sesión exitoso",
      user,
      token,
    });
  });
};

// 🔹 Cerrar sesión (no aplica con JWT, pero se deja para compatibilidad)
export const logoutUser = (_req: Request, res: Response) => {
  return res.status(200).json({ success: true, message: "Logout exitoso (JWT no requiere invalidación en servidor)" });
};

// 🔹 Verificar token (opcional)
export const checkSession = (req: Request, res: Response) => {
  const authHeader = req.headers["authorization"];
  const token = authHeader && authHeader.split(" ")[1];

  if (!token) return res.status(401).json({ loggedIn: false, message: "Token no proporcionado" });

  try {
    const decoded = jwt.verify(token, JWT_SECRET);
    res.status(200).json({ loggedIn: true, user: decoded });
  } catch {
    res.status(403).json({ loggedIn: false, message: "Token inválido o expirado" });
  }
};
