import React, { useEffect, useState } from 'react';
import axios from 'axios';

function Others() {
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/products`)
      .then(response => {
        const filteredOthers = response.data.filter(product => 
          product.status === 'disponible' && product.tipo === 'otro' // Cambia 'otro' según tu tipo real
        );

        setOthers(filteredOthers);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar los productos otros.');
        setLoading(false);
      });
  }, []);

  return (
    <div className="others-view">
      {loading ? (
        <p>Cargando otros productos...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : others.length > 0 ? (
        <div className="product-list">
          {others.map((other) => (
            <div className="product-card" key={other._id}>
              <img src={other.imagen} alt={other.nombre} className="product-image" />
              <div class="product-info">
                <h2 className="product-name">{other.nombre}</h2>
                <p className="product-description">{other.descripcion}</p>
              </div>
                <p className="product-price">${other.precio.toFixed(2)}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay otros productos disponibles.</p>
      )}
    </div>
  );
}

export default Others;
