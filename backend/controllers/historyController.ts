import { Request, Response } from "express";
import { InventoryDB } from "../db/connection";

// Obtener el historial desde la vista.
export const GetHistory = (req: Request, res: Response) => {
  InventoryDB.query(`SELECT * FROM historyView`, (err, results) => {
    if (err) return res.status(500).send("Error en el servidor.");
    res.json(results);
  });
};

// Obtener los productos (productID, name)
export const GetProducts = (req: Request, res: Response) => {
  InventoryDB.query(`SELECT productID, name FROM products`, (err, results) => {
    if (err) return res.status(500).send("Error en el servidor.");
    res.json(results);
  });
};
