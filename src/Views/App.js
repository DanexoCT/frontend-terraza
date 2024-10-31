import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import NavbarProducts from './NavbarProducts';
import Navbar from './Navbar';
import Drinks from './Drinks';
import Others from './Others';
import ProductModal from './ProductModal';
import Footer from './Footer';

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then(response => {
        const filteredProducts = response.data.filter(product =>
          product.status === 'disponible' && product.tipo === 'platillo'
        );

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los productos.');
        setLoading(false);
      });
  }, []);

  const openModal = (product) => {
    setSelectedProduct(product);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

  return (
    <Router>
      <Navbar />
      <div className="app">
      <br/><br/><br/>
        <h4 className="menu-title">Nuestro Menú</h4>
        <br/><br/>
        
        {/* Barra de Navegación */}
        <NavbarProducts />
        <br/><br/>
        <Routes>
          <Route path="/" element={
            <header className="app-header">
              {loading ? (
                <p>Cargando productos...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : products.length > 0 ? (
                <div className="product-list">
                  {products.map((product) => (
                    <div
                      className="product-card"
                      key={product._id}
                      onClick={() => openModal(product)} // Abre el modal al hacer clic
                    >
                      <img src={product.imagen} alt={product.nombre} className="product-image" />
                      <div className="product-info">
                        <h2 className="product-name">{product.nombre}</h2>
                        <p className="product-description">{product.descripcion}</p>
                      </div>
                      <p className="product-price">${product.precio.toFixed(2)}</p>
                    </div>
                  ))}
                </div>
              ) : (
                <p>No hay productos disponibles.</p>
              )}
            </header>
          } />
          <Route path="/bebidas" element={<Drinks openModal={openModal} />} />
          <Route path="/otros" element={<Others openModal={openModal} />} />
        </Routes>
        <br/><br/>
        
        {/* Aquí se incluye el modal */}
        {selectedProduct && (
          <ProductModal
            isOpen={isModalOpen}
            onRequestClose={closeModal}
            product={selectedProduct}
          />
        )}
        
        <Footer />
      </div>
    </Router>
  );
}

export default App;
