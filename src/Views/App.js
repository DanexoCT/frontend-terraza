import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation } from 'react-router-dom';
import './App.css';
import NavbarProducts from './NavbarProducts';
import Navbar from './Navbar';
import Drinks from './Drinks';
import Others from './Others';
import ProductModal from './ProductModal';
import Footer from './Footer';
import Login from './Login';
import Register from './Register';

function Main() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation(); // Hook para obtener la ruta actual

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products`)
      .then(response => {
        const filteredProducts = response.data.filter(product =>
          product.status === 'disponible' && product.tipo === 'platillo'
        );

        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar platillos.');
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

  // Mostrar u ocultar la flecha según el desplazamiento
  useEffect(() => {
    const toggleVisibility = () => {
      if (window.scrollY > 200) {
        setIsVisible(true);
      } else { 
        setIsVisible(false);
      }
    };

    window.addEventListener('scroll', toggleVisibility);
    return () => window.removeEventListener('scroll', toggleVisibility);
  }, []);

  // Función para desplazarse al inicio
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <div className="app">
      {/* Mostrar el título y la barra de navegación de productos solo si no estás en /login o /register */}
      {!['/login', '/register'].includes(location.pathname) && (
        <>
          <br/><br/><br/>
          <h4 className="menu-title">Nuestro Menú</h4>
          <br/><br/>
          <NavbarProducts />
          <br/><br/>
        </>
      )}

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
                  <div className="product-card" key={product._id} onClick={() => openModal(product)}>
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
        {/* Rutas de Login y Register */}
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
      </Routes><br/><br/>
      
      {selectedProduct && (
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          product={selectedProduct}
        />
      )}
      
      <Footer />

      {/* Flecha flotante para volver al inicio */}
      {isVisible && (
        <div className="scroll-to-top" onClick={scrollToTop}>
          <svg xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
            <line x1="12" y1="19" x2="12" y2="5"></line>
            <polyline points="5 12 12 5 19 12"></polyline>
          </svg>
        </div>
      )}
    </div>
  );
}

function App() {
  return (
    <Router>
      <Navbar />
      <Main />
    </Router>
  );
}

export default App;
