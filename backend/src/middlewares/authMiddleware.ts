import { Request, Response, NextFunction } from "express";
import jwt from "jsonwebtoken";

// 🔹 Extendemos el tipo de Request para incluir el usuario autenticado
export interface AuthenticatedRequest extends Request {
  user?: any;
}

// 🔹 Middleware para verificar el token JWT
export const verifyAuth = (req: AuthenticatedRequest, res: Response, next: NextFunction): void => {
  try {
    const authHeader = req.headers["authorization"];
    const token = authHeader && authHeader.split(" ")[1]; // Formato: Bearer <token>

    if (!token) {
      res.status(401).json({ success: false, message: "Token no proporcionado" });
      return;
    }

    const secret = process.env.JWT_SECRET || "fallback_secret";

    jwt.verify(token, secret, (err, decoded) => {
      if (err) {
        console.error("❌ Error verificando token:", err);
        res.status(403).json({ success: false, message: "Token inválido o expirado" });
        return;
      }

      req.user = decoded; // ✅ Guardamos los datos del usuario en la request
      next();
    });
  } catch (error) {
    console.error("❌ Error en verifyAuth:", error);
    res.status(500).json({ success: false, message: "Error interno del servidor" });
  }
};
