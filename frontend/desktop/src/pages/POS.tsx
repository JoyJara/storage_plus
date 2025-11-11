import React, { useState, useEffect, useRef } from "react";
import { Footer, Navbar } from "../components/HTML";
import { Navigate } from "react-router-dom";
import { useAuth } from "../hooks/useAuth";
// @ts-ignore
import * as bootstrap from "bootstrap";

interface Product {
  id: number;
  name: string;
  price: number;
  productID: number;
}

interface CartItem extends Product {
  quantity: number;
}

const POS: React.FC = () => {
  const isLoggedIn = useAuth();
  const { user } = useAuth();

  const [products, setProducts] = useState<Product[]>([]);
  const [searchTerm, setSearchTerm] = useState("");
  const [suggestions, setSuggestions] = useState<Product[]>([]);
  const [selectedProduct, setSelectedProduct] = useState<Product | null>(null);
  const [quantity, setQuantity] = useState<string>("");
  const [cart, setCart] = useState<CartItem[]>([]);
  const [isReturn, setIsReturn] = useState(false);

  const toggleButtonRef = useRef<HTMLButtonElement | null>(null);
  const tooltipInstance = useRef<any>(null);

  useEffect(() => {
    if (!isLoggedIn) return;

    fetch("/api/pos")
      .then((res) => res.json())
      .then((data) => setProducts(data))
      .catch((err) => console.error("Error fetching products:", err));
  }, [isLoggedIn]);

  useEffect(() => {
    if (toggleButtonRef.current) {
      if (tooltipInstance.current) {
        tooltipInstance.current.dispose();
      }

      toggleButtonRef.current.setAttribute(
        "title",
        isReturn
          ? "Estás registrando una devolución. Haz clic para cambiar a venta."
          : "Estás registrando una venta. Haz clic para cambiar a devolución."
      );

      tooltipInstance.current = new bootstrap.Tooltip(toggleButtonRef.current);
    }
  }, [isReturn]);

  const handleInputChange = (e: React.ChangeEvent<HTMLInputElement>) => {
    const value = e.target.value;
    setSearchTerm(value);
    setSelectedProduct(null);

    if (value.length > 0) {
      const matches = products.filter(
        (p) =>
          p.name.toLowerCase().includes(value.toLowerCase()) ||
          p.id.toString().startsWith(value)
      );
      setSuggestions(matches);
    } else {
      setSuggestions([]);
    }
  };

  const selectProduct = (product: Product) => {
    setSearchTerm(product.name);
    setSuggestions([]);
    setSelectedProduct(product);
  };

  const handleAddToCart = (e: React.FormEvent) => {
    e.preventDefault();
    const qty = parseInt(quantity || "0", 10);
    if (!selectedProduct || qty <= 0) return;

    const existingIndex = cart.findIndex(
      (item) => item.id === selectedProduct.id
    );

    const updatedCart = [...cart];

    if (existingIndex >= 0) {
      updatedCart[existingIndex].quantity += qty;
    } else {
      updatedCart.push({ ...selectedProduct, quantity: qty });
    }

    setCart(updatedCart);
    setSearchTerm("");
    setSelectedProduct(null);
    setQuantity("");
  };

  const handleRemoveFromCart = (id: number) => {
    setCart(cart.filter((item) => item.id !== id));
  };

  const totalAmount = cart.reduce(
    (total, item) => total + item.quantity * item.price,
    0
  );

  if (isLoggedIn === null) return <p>Cargando...</p>;
  if (!isLoggedIn) return <Navigate to="/" />;

  return (
    <div className="d-flex flex-column min-vh-100">
      <header>
        <Navbar />
      </header>

      <main className="content">
        <div className="container mt-5">
          <h1 className="mb-4">Punto de Venta</h1>

          <form onSubmit={handleAddToCart}>
            <div className="mb-3 position-relative">
              <label htmlFor="product" className="form-label">
                Producto
              </label>
              <input
                type="text"
                className="form-control"
                id="product"
                placeholder="Nombre o código de barra"
                value={searchTerm}
                onChange={handleInputChange}
                autoComplete="off"
              />
              {suggestions.length > 0 && (
                <ul
                  className="list-group position-absolute w-100"
                  style={{ zIndex: 1000 }}
                >
                  {suggestions.map((product) => (
                    <li
                      key={product.id}
                      className="list-group-item list-group-item-action"
                      onClick={() => selectProduct(product)}
                      style={{ cursor: "pointer" }}
                    >
                      {product.name}
                    </li>
                  ))}
                </ul>
              )}
            </div>

            <div className="mb-3">
              <label htmlFor="quantity" className="form-label">
                Cantidad
              </label>
              <input
                type="number"
                className="form-control"
                id="quantity"
                min={1}
                value={quantity}
                onChange={(e) => setQuantity(e.target.value)}
              />
            </div>

            <div className="d-flex align-items-center gap-3">
              <button type="submit" className="btn custom-green-btn">
                Agregar al carrito
              </button>

              <button
                ref={toggleButtonRef}
                type="button"
                className={`btn ${
                  isReturn ? "btn-warning" : "btn-outline-secondary"
                } rounded-pill`}
                onClick={() => setIsReturn(!isReturn)}
                data-bs-toggle="tooltip"
                data-bs-placement="right"
              >
                {isReturn ? "Devolución" : "Venta"}
              </button>
            </div>
          </form>

          <div className="row mt-4">
            <div className="col-12">
              <h3>Detalles del Carrito</h3>
              <h4>Total: ${totalAmount.toFixed(2)}</h4>

              <button
                type="button"
                onClick={() => {
                  if (cart.length === 0) {
                    alert("El carrito está vacío");
                    return;
                  }

                  const employeeID = user?.id; // Ajusta si tienes login real
                  const date = new Date().toISOString().slice(0, 10);
                  const products = cart.map((item) => ({
                    productID: item.productID,
                    quantity: item.quantity,
                  }));

                  const endpoint = isReturn ? "/api/pos/return/" : "/api/pos";
                  const method = isReturn ? "PUT" : "POST";
                  const body = { employeeID, date, products };

                  fetch(endpoint, {
                    method,
                    headers: {
                      "Content-Type": "application/json",
                    },
                    body: JSON.stringify(body),
                  })
                    .then((res) => res.json())
                    .then((data) => {
                      if (data.success) {
                        alert(
                          isReturn
                            ? "Se registró la devolución correctamente"
                            : "Se registró la venta correctamente"
                        );
                        setCart([]);
                      } else {
                        alert(data.error || "Error desconocido");
                      }
                    })
                    .catch((err) => {
                      console.error("Error al registrar:", err);
                      alert("Ocurrió un error al conectar con el servidor");
                    });
                }}
                className="btn custom-green-btn"
              >
                {isReturn ? "Registrar Devolución" : "Registrar Venta"}
              </button>

              <table className="table table-striped mt-3">
                <thead>
                  <tr>
                    <th>Producto</th>
                    <th>Cantidad</th>
                    <th>Precio Unitario</th>
                    <th>Total</th>
                    <th>Acciones</th>
                  </tr>
                </thead>
                <tbody>
                  {cart.map((item) => (
                    <tr key={item.id}>
                      <td>
                        {item.name}{" "}
                        {isReturn && (
                          <span className="badge bg-warning text-dark ms-2">
                            Devolución
                          </span>
                        )}
                      </td>
                      <td>
                        <input
                          type="number"
                          className="form-control form-control-sm"
                          style={{ width: "80px" }}
                          min={1}
                          value={item.quantity}
                          onChange={(e) => {
                            const newQty = parseInt(e.target.value, 10);
                            if (!newQty || newQty < 1) return;

                            const updatedCart = cart.map((cartItem) =>
                              cartItem.id === item.id
                                ? { ...cartItem, quantity: newQty }
                                : cartItem
                            );
                            setCart(updatedCart);
                          }}
                        />
                      </td>
                      <td>${item.price}</td>
                      <td>${item.quantity * item.price}</td>
                      <td>
                        <button
                          className="btn btn-sm btn-danger"
                          onClick={() => handleRemoveFromCart(item.id)}
                        >
                          Eliminar
                        </button>
                      </td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </main>
      <Footer />
    </div>
  );
};

export default POS;
