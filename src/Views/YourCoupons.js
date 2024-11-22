import React, { useEffect, useState } from "react";
import axios from "axios";

const YourCoupons = () => {
  const [coupons, setCoupons] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [profileData, setProfileData] = useState(null);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get("http://localhost:5000/api/customers/profile", {
          withCredentials: true,
        });
        setProfileData(response.data.profileData);
      } catch (error) {
        console.error("Error al cargar el perfil:", error);
        setError("Error al cargar el perfil. Por favor, intenta de nuevo.");
        setLoading(false);
      }
    };
    fetchProfileData();
  }, []);

  useEffect(() => {
    if (!profileData?.id) {
      console.warn("El perfil aún no contiene un ID válido:", profileData);
      return;
    }

    const fetchCoupons = async () => {
      try {
        const response = await axios.get(
          `http://localhost:5000/api/cliente-cupons/${profileData.id}`,
          { withCredentials: true }
        );
        console.log("Cupones recibidos:", response.data.cupones);
        setCoupons(response.data.cupones || []);
      } catch (err) {
        console.error("Error al obtener cupones:", err);
        setError("Error al cargar los cupones. Intenta de nuevo más tarde.");
      } finally {
        setLoading(false);
      }
    };

    fetchCoupons();
  }, [profileData]);

  if (loading) {
    return <p>Cargando datos...</p>;
  }

  if (error) {
    return <p>{error}</p>;
  }

  return (
    <div className="coupons-container">
      <h1>Tus Cupones</h1>
      {coupons.length === 0 ? (
        <p>No tienes cupones activos.</p>
      ) : (
        <div className="coupons-grid">
          {coupons.map((coupon) => (
            <div className="coupon-card" key={coupon._id}>
              <h2>{coupon.nombre || "Cupón Desconocido"}</h2>
              <p><strong>Descuento:</strong> {coupon.descuento || "N/A"}%</p>
              <p><strong>Descripción:</strong> {coupon.descripcion || "N/A"}</p>
              <p><strong>Costo en puntos:</strong> {coupon.costoPuntos || "N/A"}</p>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default YourCoupons;
