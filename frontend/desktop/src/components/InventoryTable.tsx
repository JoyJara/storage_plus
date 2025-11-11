import React from "react";

interface Product {
  ID: number;
  Name: string;
  Category: string;
  Stock: number;
  Price: number;
}

interface Props {
  products: Product[];
  onEdit: (product: Product) => void;
  onDelete: (id: number) => void;
}

const InventoryTable: React.FC<Props> = ({ products, onEdit, onDelete }) => {
  return (
    <table className="table table-striped">
      <thead>
        <tr>
          <th>ID</th>
          <th>Producto</th>
          <th>Categoría</th>
          <th>Stock</th>
          <th>Precio</th>
          <th>Acciones</th>
        </tr>
      </thead>
      <tbody>
        {products.map((item) => (
          <tr key={item.ID}>
            <td>{item.ID}</td>
            <td>{item.Name}</td>
            <td>{item.Category}</td>
            <td>{item.Stock}</td>
            <td>${item.Price}</td>
            <td>
              <button
                className="btn btn-sm btn-warning me-2"
                onClick={() => onEdit(item)}
              >
                Editar
              </button>
              <button
                className="btn btn-sm btn-danger"
                onClick={() => onDelete(item.ID)}
              >
                Eliminar
              </button>
            </td>
          </tr>
        ))}
      </tbody>
    </table>
  );
};

export default InventoryTable;
