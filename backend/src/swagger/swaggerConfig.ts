import { Express } from "express";
import swaggerUi from "swagger-ui-express";
import yaml from "yamljs";
import path from "path";

// 📘 Ruta absoluta al archivo openapi.yaml
const swaggerPath = path.join(__dirname, "openapi.yaml");

// 🧩 Carga y parsea el archivo YAML
const swaggerDocument = yaml.load(swaggerPath);

/**
 * Configura y monta Swagger UI en la ruta /api/docs
 * Compatible con JWT (BearerAuth) y definición OpenAPI 3.0
 */
export const setupSwagger = (app: Express) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerDocument));
  console.log("📘 Swagger UI disponible en http://localhost:3000/api/docs");
};
