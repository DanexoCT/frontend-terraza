import React from "react";
import { useYourCoupons } from "../hooks/useYourCoupons.js";


const YourCoupons = () => {
  const { coupons, loading, error } = useYourCoupons();

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p><div className="error-message">{error}</div></p>;
  }

  return (
    <div className="coupons-container">
      <h1 className="title-yourcoupons">Tus Cupones</h1>
      {coupons.length === 0 ? (
        <p>No tienes cupones todavía, ahorra puntos en tus compras para obtener cupones.</p>
      ) : (
        <div className="coupons-grid">
          {coupons.map((coupon, index) => (
            <div className="coupon-card" key={coupon._id || index}>
              <h2>{coupon.nombre || "Cupón Desconocido"}</h2>
              <p><strong>Descuento:</strong> {coupon.descuento || "N/A"}%</p>
              <p><strong>Descripción:</strong> {coupon.descripcion || "N/A"}</p>
              <p><strong>Costo en puntos:</strong> {coupon.costoPuntos || "N/A"}</p>
              <div className="coupon-badge">Tienes <strong>{coupon.cantidad}</strong> en tu cuenta</div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};


export default YourCoupons;
