import React from 'react';
import '../css/Coupons.css';
import { useNavigate } from 'react-router-dom'; // Para redirigir a login
import { useCoupons } from '../hooks/useCoupons.js';

const CouponsView = () => {
    const navigate = useNavigate();
    const { coupons, loading, toast, handleRedeem } = useCoupons(navigate);

    if (loading) {
        return <p>Cargando cupones...</p>;
    }
    if (!Array.isArray(coupons)) {
        return <p>No se encontraron cupones disponibles.</p>;
    }

    return (
        <div className="coupons-container">
            {/* Contenedor de la alerta */}
            {toast && (
                <div className={`toast ${toast.type}`}>
                    {toast.message}
                </div>
            )}

            <h1 className="title-coupons">Nuestros Cupones</h1>
            <div className="coupons-grid">
                {coupons.map((coupon) => (
                    <div className="coupon-card" key={coupon._id || coupon.id}>
                        <h2>{coupon.nombre}</h2>
                        <p>{coupon.descripcion}</p>
                        <p><strong>Descuento:</strong> {coupon.descuento}%</p>
                        <p><strong>Costo en puntos:</strong> {coupon.costoPuntos}</p>
                        <button
                            className="redeem-button"
                            onClick={() => handleRedeem(coupon.id)}
                        >
                            Canjear
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CouponsView;
