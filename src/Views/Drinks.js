import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then(response => {
        const filteredDrinks = response.data.filter(product => 
          product.status === 'disponible' && product.tipo === 'bebida'
        );

        setDrinks(filteredDrinks);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar las bebidas.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="drinks-view">
      {loading ? (
        <p>Cargando bebidas...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : drinks.length > 0 ? (
        <div className="product-list">
          {drinks.map((drink) => (
            <div className="product-card" key={drink._id}>
              <img src={drink.imagen} alt={drink.nombre} className="product-image" />
              <div class="product-info">
                <h2 className="product-name">{drink.nombre}</h2>
                <p className="product-description">{drink.descripcion}</p>
              </div>
                <p className="product-price">${drink.precio.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay bebidas disponibles.</p>
      )}
    </div>
  );
}

export default Drinks;
