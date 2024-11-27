import React, { useState, useEffect } from 'react';
import './Coupons.css';
import { useNavigate } from 'react-router-dom'; // Para redirigir a login
import { fetchUserProfile } from './Services'; // Importar la función para obtener el perfil

const CouponsView = () => {
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clienteId, setClienteId] = useState(null);
    const [toast, setToast] = useState(null); // Estado para gestionar las alertas
    const navigate = useNavigate();

    useEffect(() => {
        const fetchCouponsAndProfile = async () => {
            try {
                const couponsResponse = await fetch('http://localhost:5000/api/coupons', {
                    method: 'GET',
                    credentials: 'include',
                });

                if (couponsResponse.status === 401) {
                    navigate('/login');
                    return;
                }
                const couponsData = await couponsResponse.json();
                setCoupons(couponsData);

                const userProfile = await fetchUserProfile();
                setClienteId(userProfile.id);
            } catch (error) {
                console.error('Error al cargar los cupones o el perfil:', error);
            } finally {
                setLoading(false);
            }
        };

        fetchCouponsAndProfile();
    }, [navigate]);

    const handleRedeem = async (cuponId) => {
        if (!clienteId) {
            setToast({ message: 'Usuario no autenticado o datos de perfil no cargados', type: 'error' });
            return;
        }

        try {
            const response = await fetch(`http://localhost:5000/api/coupons/canjear/${clienteId}/${cuponId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json',
                },
            });

            if (response.ok) {
                setToast({ message: 'Cupón canjeado exitosamente', type: 'success' });
                setTimeout(() => window.location.reload(), 1000); // Recargar página
            } else {
                const errorData = await response.json();
                setToast({ message: `Error al canjear el cupón: ${errorData.message}`, type: 'error' });
                setTimeout(() => setToast(null), 4000);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            setToast({ message: 'Hubo un problema al intentar canjear el cupón', type: 'error' });
        }
    };

    if (loading) {
        return <p>Cargando cupones...</p>;
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
                            onClick={() => handleRedeem(coupon._id)}
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
