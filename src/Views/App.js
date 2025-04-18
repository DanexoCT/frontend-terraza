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
import Profile from './Profile';
import Coupons from './Coupons';
import YourCoupons from './YourCoupons';
import { AuthProvider } from './AuthContext';
import Modal from 'react-modal';



function Main() {
  Modal.setAppElement('#root');
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedProduct, setSelectedProduct] = useState(null);
  const [isVisible, setIsVisible] = useState(false);

  const location = useLocation();

  useEffect(() => {

    const apiUrl = process.env.REACT_APP_API_URL_APP
    axios.get(`${apiUrl}/product`)
      .then(response => {
        const filteredProducts = response.data
          .filter(product => product.status === 1 && product.tipo === 'platillo')
          .map(product => ({
            ...product,
            precio: Number(product.precio).toFixed(2),
          }))
        setProducts(filteredProducts);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar platillos.', err);
        setLoading(false);
      });
  }, []);

  const openModal = (product) => {
    if (!isModalOpen) {
      setSelectedProduct(product);
      setIsModalOpen(true);
    } else {
      console.log('Modal ya está abierto');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedProduct(null);
  };

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

  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (

    <div className="app">
      {/* Mostrar el título y la barra de navegación de productos solo si no estás en /login, /register o /profile */}
      {!['/login', '/register', '/profile', '/coupons', '/yourCoupons'].includes(location.pathname) && (
        <>
          <br /><br /><br />
          <h4 className="menu-title">Nuestro Menú</h4>
          <br /><br />
          <NavbarProducts />
          <br /><br />
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
                  <div className="product-card" key={product.id} onClick={() => openModal(product)}>
                    <img src={product.imagen} alt={product.nombre} className="product-image" />
                    <div className="product-info">
                      <h2 className="product-name">{product.nombre}</h2>
                      <p className="product-description">{product.descripcion}</p>
                    </div>
                    <p className="product-price">${product.precio}</p>
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
        <Route path="/login" element={<Login />} />
        <Route path="/register" element={<Register />} />
        <Route path="/profile" element={<Profile />} />
        <Route path="/coupons" element={<Coupons />} />
        <Route path="/yourCoupons" element={<YourCoupons />} />
      </Routes><br /><br />

      {isModalOpen && selectedProduct && (
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
    <AuthProvider> {/* Envuelve tu app en el AuthProvider */}
      <Router>
        <Navbar /> {/* Navbar cambia según el estado de autenticación */}
        <Main />
      </Router>
    </AuthProvider>
  );
}

export default App;
