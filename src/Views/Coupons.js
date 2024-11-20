import React, { useState, useEffect } from 'react';
import './Coupons.css';
import { useNavigate } from 'react-router-dom'; // Para redirigir a login
import { fetchUserProfile } from './Services'; // Importar la función para obtener el perfil

const CouponsView = () => {
    // Estado para almacenar los cupones, el estado de carga y el cliente_id
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);
    const [clienteId, setClienteId] = useState(null); // Nuevo estado para almacenar el cliente_id
    const navigate = useNavigate(); // Hook para redirigir a login si no está autenticado


    // UseEffect para cargar los cupones y obtener el perfil del usuario cuando el componente se monta
    useEffect(() => {
        const fetchCouponsAndProfile = async () => {
            try {
                // Obtener cupones
                const couponsResponse = await fetch('http://localhost:5000/api/coupons', {
                    method: 'GET',
                    credentials: 'include' 
                });

                if(couponsResponse.status === 401){
                    navigate('/login'); // Redirige al login si el token es inválido o no existe
                    return; 
                }
                const couponsData = await couponsResponse.json();
                setCoupons(couponsData); // Almacenar los cupones en el estado

                // Obtener el perfil del usuario
                const userProfile = await fetchUserProfile();
                setClienteId(userProfile.id); // Asignar el cliente_id al estado
                console.log(userProfile)
            } catch (error) {
                console.error('Error al cargar los cupones o el perfil:', error);
            } finally {
                setLoading(false); // Actualizar el estado de carga
            }
        };

        fetchCouponsAndProfile(); // Llamar a la función para obtener los cupones y el perfil
    }, [navigate]);

    // Función para manejar el canjeo de cupones
    const handleRedeem = async (cuponId) => {
        if (!clienteId) {
            alert('Usuario no autenticado o datos de perfil no cargados'); // Verificar si el clienteId está disponible
            return;
        }

        try {
            // Realiza la solicitud POST para canjear el cupón
            const response = await fetch(`http://localhost:5000/api/coupons/canjear/${clienteId}/${cuponId}`, {
                method: 'POST',
                headers: {
                    'Content-Type': 'application/json', // Especifica que la solicitud es en formato JSON
                },
            });

            // Si la respuesta es exitosa, actualiza el estado de los cupones y muestra una alerta
            if (response.ok) {
                alert('Cupón canjeado exitosamente');
                setCoupons((prevCoupons) =>
                    prevCoupons.filter((coupon) => coupon._id !== cuponId) // Filtra el cupón canjeado de la lista
                );
            } else {
                // Si la respuesta no es exitosa, maneja el error mostrado por el servidor
                const errorData = await response.json();
                alert(`Error al canjear el cupón: ${errorData.message}`);
            }
        } catch (error) {
            console.error('Error en la solicitud:', error);
            alert('Hubo un problema al intentar canjear el cupón');
        }
    };

    // Si los cupones aún están siendo cargados, muestra un mensaje de carga
    if (loading) {
        return <p>Cargando cupones...</p>;
    }

    return (
        <div className="coupons-container">
            <h1>Nuestros Cupones</h1>
            <div className="coupons-grid">
                {/* Mapea los cupones y crea una tarjeta para cada uno */}
                {coupons.map((coupon) => (
                    <div className="coupon-card" key={coupon._id || coupon.id}>
                        <h2>{coupon.nombre}</h2>
                        <p>{coupon.descripcion}</p>
                        <p><strong>Descuento:</strong> {coupon.descuento}%</p>
                        <p><strong>Costo en puntos:</strong> {coupon.costoPuntos}</p>
                        <button
                            className="redeem-button"
                            onClick={() => handleRedeem(coupon._id)} // Llama a handleRedeem al hacer clic en el botón
                        >
                            Canjear
                        </button>
                    </div>
                ))}
            </div>
        </div>
    );
};

export default CouponsView;