import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import './App.css';
import Footer from './Views/Footer';
import Navbar from './Views/Navbar';
import Drinks from './Views/Drinks';
import Others from './Views/Others'; 

function App() {
  const [products, setProducts] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

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

  return (
    <Router>
      <div className="App">
      <div className="hr-container">
        <img 
            src="/images/La-terraza-Shade-Logo.png" 
            alt="LaTerraza Logo" 
            className="logo-image" 
          />
          </div>
        <div className="hr-container">
          <hr className="custom-hr" />
        </div>
        <h4 className="menu-title">Nuestro Menú</h4>
        <div className="hr-container">
          <hr className="custom-hr" />
        </div>

        {/* Barra de Navegación */}
        <Navbar />

        <Routes>
          <Route path="/" element={
            <header className="App-header">
              {loading ? (
                <p>Cargando productos...</p>
              ) : error ? (
                <p className="error-message">{error}</p>
              ) : products.length > 0 ? (
                <div className="product-list">
                  {products.map((product) => (
                    <div className="product-card" key={product._id}>
                      <img src={product.imagen} alt={product.nombre} className="product-image" />
                      <div class="product-info">
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
          
          <Route path="/bebidas" element={<Drinks />} />
          <Route path="/otros" element={<Others />} />
        </Routes>

        <Footer />
      </div>
    </Router>
  );
}

export default App;
