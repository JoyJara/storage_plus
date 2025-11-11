import mysql from "mysql2";
import dotenv from "dotenv";
dotenv.config();

export const InventoryDB = mysql.createConnection({
  host: process.env.DB_HOST,
  user: process.env.DB_USER,
  password: process.env.DB_PASSWORD,
  database: process.env.DB_NAME,
});

InventoryDB.connect((err) => {
  if (err) {
    console.error("Error al conectarse a la DB:", err);
    return;
  }
  console.log("Conectado a la base de datos MySQL");
});
