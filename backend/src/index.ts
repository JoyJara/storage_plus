import express, { Request, Response, NextFunction } from "express";
import cors from "cors";
import dotenv from "dotenv";
import path from "path";
import fs from "fs";
import { setupSwagger } from "./swagger/swaggerConfig";

// 🔹 Conexión a la base de datos
import { InventoryDB } from "./db/connection";

// 🔹 Rutas API
import authRoutes from "./routes/authRoutes";
import inventoryRoutes from "./routes/inventoryRoutes";
import posRoutes from "./routes/posRoutes";
import employeesRoutes from "./routes/employeesRoutes";
import historyRoutes from "./routes/historyRoutes";
import emailRoutes from "./routes/emailRoutes";

// 🔹 Configuración inicial
dotenv.config();
const app = express();

// 🧠 Middlewares base
app.use(express.json());
app.use(express.urlencoded({ extended: true }));

// 🌐 CORS
app.use(
  cors({
    origin: [
      "http://localhost:5173", // Web local
      "http://192.168.0.25:5173", // IP local
      "http://66.179.92.207:5173", // VPS
      "exp://*", // Expo móvil
    ],
    credentials: true,
  })
);

// 🚦 Ruta de salud (para verificar conexión desde móvil o VPS)
app.get("/api/health", (_req: Request, res: Response) => {
  res.json({ message: "✅ Backend activo y accesible", status: "ok" });
});

// 🔹 Rutas API
app.use("/api/auth", authRoutes);
app.use("/api/inventory", inventoryRoutes);
app.use("/api/pos", posRoutes);
app.use("/api/employees", employeesRoutes);
app.use("/api/history", historyRoutes);
app.use("/api/email", emailRoutes);

// 📘 Swagger (al final, tras definir las rutas)
setupSwagger(app);

// 🌐 Servir frontend (solo en producción)
const distPath = path.resolve(__dirname, "dist");
const indexHtmlPath = path.join(distPath, "index.html");

if (process.env.NODE_ENV === "production" && fs.existsSync(indexHtmlPath)) {
  app.use(express.static(distPath));
  app.get("*", (_req, res) => res.sendFile(indexHtmlPath));
}

// ⚙️ Middleware de manejo de errores global
app.use((err: Error, _req: Request, res: Response, _next: NextFunction) => {
  console.error("❌ Error no controlado:", err.message);
  res.status(500).json({ success: false, message: "Error interno del servidor" });
});

// 🚀 Conectar DB e iniciar servidor
const PORT = Number(process.env.PORT) || 3000;

InventoryDB.connect((err) => {
  if (err) {
    console.error("❌ Error al conectar a la base de datos:", err.message);
    process.exit(1);
  }

  console.log("✅ Conectado a la base de datos MySQL");

  app.listen(PORT, "0.0.0.0", () => {
    console.log("======================================");
    console.log("🚀 Servidor backend corriendo:");
    console.log(`   Local:       http://localhost:${PORT}`);
    console.log(`   Externo:     http://${process.env.HOST || "66.179.92.207"}:${PORT}`);
    console.log(`   Swagger UI:  http://localhost:${PORT}/api/docs`);
    console.log("======================================");
  });
});
