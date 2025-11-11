import { Request, Response } from "express";
import { InventoryDB } from "../db/connection";

// Obtener el inventario desde la vista
export const GetInventory = (req: Request, res: Response) => {
  InventoryDB.query(`SELECT * FROM inventoryView`, (err, results) => {
    if (err) return res.status(500).send("Error en el servidor.");
    res.json(results);
  });
};

// Obtener las categorías disponibles
export const GetCategories = (req: Request, res: Response) => {
  InventoryDB.query(
    `SELECT categoryID AS id, name FROM categories ORDER BY name`,
    (err, results) => {
      if (err)
        return res.status(500).json({ error: "Error al obtener categorías" });
      res.json(results);
    }
  );
};

// Agregar un nuevo producto con logging
export const AddProduct = (req: Request, res: Response) => {
  const { Producto, CodigoBarras, Categoria, Descripcion, Stock, Precio } =
    req.body;

  const employeeID = req.session?.user?.id;
  if (!employeeID || isNaN(employeeID)) {
    res.status(401).json({ success: false, error: "Empleado no autenticado" });
    return;
  }

  InventoryDB.query(
    "CALL addProduct(?, ?, ?, ?, ?, ?, ?)",
    [Producto, CodigoBarras, Categoria, Descripcion, Stock, Precio, employeeID],
    (err, results) => {
      if (err) {
        console.error("Error al agregar producto:", err);
        res.status(500).json({ success: false, error: err.message });
        return;
      }

      res.json({
        success: true,
        message: "Se agregó el producto correctamente",
        results,
      });
    }
  );
};

// Editar producto con logging
export const EditProduct = (req: Request, res: Response) => {
  const productID = req.params.id;
  const { Producto, Categoria, Precio, Stock } = req.body;
  const employeeID = req.session?.user?.id;

  if (!employeeID || isNaN(employeeID)) {
    console.log(employeeID);
    res.status(401).json({ success: false, error: "Empleado no autenticado" });
    return;
  }

  InventoryDB.query(
    "CALL editProduct(?, ?, ?, ?, ?, ?)",
    [productID, Producto, Categoria, Precio, Stock, employeeID],
    (err, results) => {
      if (err) {
        console.error("Error al editar producto:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error al editar" });
      }

      res.json({
        success: true,
        message: "Producto actualizado correctamente",
        results,
      });
    }
  );
};

// Eliminar producto con logging
export const DeleteProduct = (req: Request, res: Response) => {
  const productID = req.params.id;
  const employeeID = req.session?.user?.id;

  if (!employeeID || isNaN(employeeID)) {
    console.log(employeeID);
    res.status(401).json({ success: false, error: "Empleado no autenticado" });
    return;
  }

  InventoryDB.query(
    "CALL deleteProduct(?, ?)",
    [productID, employeeID],
    (err, results) => {
      if (err) {
        console.error("Error al eliminar producto:", err);
        return res
          .status(500)
          .json({ success: false, error: "Error al eliminar" });
      }

      res.json({
        success: true,
        message: "Producto eliminado correctamente",
        results,
      });
    }
  );
};

// Agregar únicamente stock.
export const AddStock = (req: Request, res: Response) => {
  const { quantity } = req.body;
  const productID = req.params.id;

  const query = `CALL inventario.addStock(?, ?)`;

  InventoryDB.query(query, [productID, quantity], (err, results) => {
    if (err) {
      console.error("Error al incrementar stock:", err);
      return res.status(500).json({ success: false, error: err.message });
    }

    res.json({ success: true, message: "Stock actualizado correctamente" });
  });
};
