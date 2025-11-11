import { Response } from "express";
import { InventoryDB } from "../db/connection";
import { AuthenticatedRequest } from "../middlewares/authMiddleware";

// 🔹 Obtener inventario
export const GetInventory = (_req: AuthenticatedRequest, res: Response) => {
  InventoryDB.query(`SELECT * FROM inventoryView`, (err, results) => {
    if (err) return res.status(500).send("Error en el servidor.");
    res.json(results);
  });
};

// 🔹 Obtener categorías
export const GetCategories = (_req: AuthenticatedRequest, res: Response) => {
  InventoryDB.query(`SELECT categoryID AS id, name FROM categories ORDER BY name`, (err, results) => {
    if (err) return res.status(500).json({ error: "Error al obtener categorías" });
    res.json(results);
  });
};

// 🔹 Agregar producto
export const AddProduct = (req: AuthenticatedRequest, res: Response) => {
  const { Producto, CodigoBarras, Categoria, Descripcion, Stock, Precio } = req.body;
  const employeeID = req.user?.id;

  if (!employeeID) return res.status(401).json({ success: false, error: "Empleado no autenticado" });

  InventoryDB.query(
    "CALL addProduct(?, ?, ?, ?, ?, ?, ?)",
    [Producto, CodigoBarras, Categoria, Descripcion, Stock, Precio, employeeID],
    (err) => {
      if (err) {
        console.error("Error al agregar producto:", err);
        return res.status(500).json({ success: false, error: err.message });
      }
      res.json({ success: true, message: "Producto agregado correctamente" });
    }
  );
};

// 🔹 Editar producto
export const EditProduct = (req: AuthenticatedRequest, res: Response) => {
  const productID = req.params.id;
  const { Producto, Categoria, Precio, Stock } = req.body;
  const employeeID = req.user?.id;

  if (!employeeID) return res.status(401).json({ success: false, error: "Empleado no autenticado" });

  InventoryDB.query(
    "CALL editProduct(?, ?, ?, ?, ?, ?)",
    [productID, Producto, Categoria, Precio, Stock, employeeID],
    (err) => {
      if (err) {
        console.error("Error al editar producto:", err);
        return res.status(500).json({ success: false, error: "Error al editar producto" });
      }
      res.json({ success: true, message: "Producto actualizado correctamente" });
    }
  );
};

// 🔹 Eliminar producto
export const DeleteProduct = (req: AuthenticatedRequest, res: Response) => {
  const productID = req.params.id;
  const employeeID = req.user?.id;

  if (!employeeID) return res.status(401).json({ success: false, error: "Empleado no autenticado" });

  InventoryDB.query("CALL deleteProduct(?, ?)", [productID, employeeID], (err) => {
    if (err) {
      console.error("Error al eliminar producto:", err);
      return res.status(500).json({ success: false, error: "Error al eliminar producto" });
    }
    res.json({ success: true, message: "Producto eliminado correctamente" });
  });
};

// 🔹 Agregar stock
export const AddStock = (_req: AuthenticatedRequest, res: Response) => {
  const { quantity } = _req.body;
  const productID = _req.params.id;

  InventoryDB.query(`CALL inventario.addStock(?, ?)`, [productID, quantity], (err) => {
    if (err) {
      console.error("Error al incrementar stock:", err);
      return res.status(500).json({ success: false, error: err.message });
    }
    res.json({ success: true, message: "Stock actualizado correctamente" });
  });
};
