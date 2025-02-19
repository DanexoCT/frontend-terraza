import React, { useEffect, useState } from 'react';
import axios from 'axios';
import ProductModal from './ProductModal';

function Others() {
  const [others, setOthers] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [selectedOther, setSelectedOther] = useState(null);

  useEffect(() => {
    const apiUrl = process.env.REACT_APP_API_URL_APP
    axios.get(`${apiUrl}/product`)
      .then(response => {
        const filteredOthers = response.data.filter(product =>
          product.status === 1 && product.tipo === 'otro')
          .map(product => ({
            ...product,
            precio: Number(product.precio).toFixed(2),
          }));

        setOthers(filteredOthers);
        setLoading(false);
      })
      .catch(err => {
        setError('Error al cargar otros productos.');
        setLoading(false);
      });
  }, []);

  const openModal = (other) => {
    if (!isModalOpen) {
      setSelectedOther(other);
      setIsModalOpen(true);
    } else {
      console.log('Modal ya está abierto');
    }
  };

  const closeModal = () => {
    setIsModalOpen(false);
    setSelectedOther(null);
  };

  return (
    <div className="others-view">
      {loading ? (
        <p>Cargando otros productos...</p>
      ) : error ? (
        <p className="error-message">{error}</p>
      ) : others.length > 0 ? (
        <div className="product-list">
          {others.map((other) => (
            <div
              className="product-card"
              key={other.id}
              onClick={() => openModal(other)} // Abre el modal al hacer clic
            >
              <img src={other.imagen} alt={other.nombre} className="product-image" />
              <div className="product-info">
                <h2 className="product-name">{other.nombre}</h2>
                <p className="product-description">{other.descripcion}</p>
              </div>
              <p className="product-price">${other.precio}</p>
            </div>
          ))}
        </div>
      ) : (
        <p>No hay otros productos disponibles.</p>
      )}

      {/* Aquí se incluye el modal */}
      {isModalOpen && selectedOther && (
        <ProductModal
          isOpen={isModalOpen}
          onRequestClose={closeModal}
          product={selectedOther}
        />
      )}
    </div>
  );
}

export default Others;
