import { Express } from "express";
import swaggerJsdoc from "swagger-jsdoc";
import swaggerUi from "swagger-ui-express";

const options: swaggerJsdoc.Options = {
  definition: {
    openapi: "3.0.3",
    info: {
      title: "Storage Plus API",
      version: "1.0.0",
      description:
        "📦 API REST para el sistema Storage Plus: inventario, empleados, POS y reportes.",
    },
    servers: [
      { url: "http://localhost:3000", description: "Servidor local" },
      { url: "http://66.179.92.207:3000", description: "Servidor VPS" },
    ],
    components: {
      securitySchemes: {
        BearerAuth: {
          type: "http",
          scheme: "bearer",
          bearerFormat: "JWT",
        },
      },
    },
    security: [
      {
        BearerAuth: [],
      },
    ],
  },
  apis: ["./src/swagger/docs/*.ts"],
};

const swaggerSpec = swaggerJsdoc(options);

export const setupSwagger = (app: Express) => {
  app.use("/api/docs", swaggerUi.serve, swaggerUi.setup(swaggerSpec));
  console.log("📘 Swagger UI disponible en /api/docs");
};
