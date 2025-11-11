import { Request, Response, NextFunction } from "express";
import { InventoryDB } from "../db/connection";

// Controlador para obtener los productos (productID, name).
export const GetProducts = (req: Request, res: Response) => {
  InventoryDB.query(
    `SELECT barcode AS id, name, price, productID FROM products ORDER BY name`,
    (err, results) => {
      if (err) {
        //return next(err);
      }
      res.json(results);
    }
  );
};

// Controlador que registra las ventas del POS.
export const LogSale = (req: Request, res: Response) => {
  const { employeeID, date, products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    res.status(400).json({ error: "El carrito está vacío o mal formado" });
    return;
  }

  const sql = `CALL logSale(2, 1, ?, ?, ?)`;
  const params = [
    employeeID,
    date,
    JSON.stringify(products),
  ];

  InventoryDB.execute(sql, params, (err, results) => {
    if (err) {
      console.error("Error al registrar la venta", err);
      if (err.sqlState === '45000') {
        res.status(400).json({error: err.message});
        return;
      }
      res.status(500).json({ error: "Error en la base de datos" });
      return;
    }

    res.json({
      success: true,
      message: "La venta se registró correctamente",
      results,
    });
  });
};

// Controlador que registra las devoluciones del POS.
export const LogReturn = (req: Request, res: Response) => {
  const { employeeID, date, products } = req.body;

  if (!Array.isArray(products) || products.length === 0) {
    res.status(400).json({ error: "El carrito está vacío o mal formado" });
    return;
  }

  const sql = `CALL logReturn(1, 2, ?, ?, ?)`;
  const params = [
    employeeID,
    date,
    JSON.stringify(products),
  ];

  InventoryDB.execute(sql, params, (err, results) => {
    if (err) {
      console.error("Error al registrar la devolución", err);
      if (err.sqlState === '45000') {
        res.status(400).json({error: err.message});
        return;
      }
      res.status(500).json({ error: "Error en la base de datos" });
      return;
    }

    res.json({
      success: true,
      message: "La devolución se registró correctamente",
      results,
    });
  });
};