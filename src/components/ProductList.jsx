import React from 'react';

const ProductList = ({ products, openModal }) => {
    if (!products.length) {
        return <p>No hay productos disponibles.</p>;
    }

    return (
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
    );
};

export default ProductList;
