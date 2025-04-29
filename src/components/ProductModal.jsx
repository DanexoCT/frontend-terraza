import React from 'react';
import Modal from 'react-modal';
import { useMediaQuery } from '@mui/material';
import '../css/ProductModal.css';


const ProductModal = ({ isOpen, onRequestClose, product }) => {
  const isMobile = useMediaQuery('(max-width:500px)');
  // si product es válido antes de renderizar
  if (!product) return null;
  return (
    <Modal
      isOpen={isOpen}
      onRequestClose={onRequestClose}
      className="product-modal-content"
      overlayClassName="product-modal-overlay"
    >
      <h2 className="product-modal-title">{product.nombre}</h2>
      <div className="product-modal-image-container">
        <img src={product.imagen} alt={product.nombre} className={`product-modal-image ${isMobile ? 'product-modal-image-mobile' : ''}`} />
      </div>

      <p className={`product-modal-description ${isMobile ? 'product-modal-description-mobile' : ''}`}> {product.descripcion}</p>
      <p className="product-points">{product.valorPuntos} pts.</p>
    </Modal>
  );
};

export default ProductModal;
