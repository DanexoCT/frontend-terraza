import React, { useState } from 'react';
import useFilteredProducts from '../hooks/useProducts';
import ProductList from './ProductList';
import ProductModal from './ProductModal';

function ProductCategory({ tipo, titulo }) {
    const { products, loading, error } = useFilteredProducts(tipo);
    const [isModalOpen, setIsModalOpen] = useState(false);
    const [selectedProduct, setSelectedProduct] = useState(null);

    const openModal = (product) => {
        setSelectedProduct(product);
        setIsModalOpen(true);
    };
    const closeModal = () => {
        setIsModalOpen(false);
        setSelectedProduct(null);
    };

    return (
        <div className="product-category-view">
            <h4 className="menu-title">{titulo}</h4>
            {loading ? (
                <p>Cargando {titulo.toLowerCase()}...</p>
            ) : error ? (
                <p className="error-message">{error}</p>
            ) : products.length > 0 ? (
                <ProductList products={products} openModal={openModal} />
            ) : (
                <p>No hay {titulo.toLowerCase()} disponibles.</p>
            )}

            {isModalOpen && selectedProduct && (
                <ProductModal
                    isOpen={isModalOpen}
                    onRequestClose={closeModal}
                    product={selectedProduct}
                />
            )}
        </div>
    );
}

export default ProductCategory;
