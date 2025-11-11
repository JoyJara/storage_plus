// Tipos
export interface Category {
  id: number;
  name: string;
}

// Utilidad para obtener el ID de una categoría dado su nombre
export const getCategoryIDByName = (
  categories: Category[],
  name: string
): number | undefined => {
  return categories.find((category) => category.name === name)?.id;
};

// Tipo de producto recibido desde la base de datos
export interface Product {
  ID: number;
  Name: string;
  Category: string;
  Stock: number;
  Price: number;
  Barcode?: string;
  Description?: string;
}

// Tipo de producto que se edita o crea (formulario)
export interface EditableProduct {
  ID: number;
  Name: string;
  Category: string;
  Stock: number | "";
  Price: number | "";
  Barcode?: string;
  Description?: string;
}

// Crea un producto vacío para agregar en el formulario
export const createEmptyProduct = (): EditableProduct => ({
  ID: 0,
  Name: "",
  Category: "",
  Stock: "",
  Price: "",
  Barcode: "",
  Description: "",
});
