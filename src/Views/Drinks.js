import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModal from './ProductModal';

function Drinks() {
  const [drinks, setDrinks] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedDrink, setSelectedDrink] = useState(null);

  useEffect(() => {
    axios.get(`http://localhost:5000/api/products`)
      .then(response => {
        const filteredDrinks = response.data.filter(product => 
          product.status === 'disponible' && product.tipo === 'bebida'
        );

        setDrinks(filteredDrinks);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar bebidas.');
        setLoading(false);
      });
  }, []);

  const openModal = (drink) => {
    setSelectedDrink(drink);
    setIsModalOpen(true);
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedDrink(null);
  };

  return (
    <div className="drinks-view">
      {loading ? (
        <p>Cargando bebidas...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : drinks.length > 0 ? (
        <div className="product-list">
          {drinks.map((drink) => (
            <div
              className="product-card"
              key={drink._id}
              onClick={() => openModal(drink)} // Abre el modal al hacer clic
            >
              <img src={drink.imagen} alt={drink.nombre} className="product-image" />
              <div className="product-info">
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

      {/* Aquí se incluye el modal */}
      {selectedDrink && (
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          product={selectedDrink}
        />
      )}
    </div>
  );
}

export default Drinks;
