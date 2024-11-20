import React, { useState, useEffect } from 'react';
import './Coupons.css';

const CouponsView = () => {
    // Estado para almacenar los cupones y el estado de carga
    const [coupons, setCoupons] = useState([]);
    const [loading, setLoading] = useState(true);

    // UseEffect para cargar los cupones desde el servidor cuando el componente se monta
    useEffect(() => {
        const fetchCoupons = async () => {
            try {
                // Realiza la solicitud GET para obtener los cupones
                const response = await fetch('http://localhost:5000/api/coupons');
                const data = await response.json();
                console.log('Datos recibidos:', data); // Depuración: muestra los cupones recibidos
                setCoupons(data); // Almacena los cupones en el estado
            } catch (error) {
                console.error('Error al cargar los cupones:', error); // Captura y muestra errores de la solicitud
            } finally {
                setLoading(false); // Actualiza el estado para indicar que la carga ha terminado
            }
        };
    
        fetchCoupons(); // Llama a la función para obtener los cupones
    }, []);

    // Función para manejar el canjeo de cupones
    const handleRedeem = async (cuponId) => {
        // Obtiene el identificador del usuario desde el almacenamiento local
        const userIdentifier = localStorage.getItem('userIdentifier'); 
        if (!userIdentifier) {
            alert('Usuario no autenticado'); // Si el usuario no está autenticado, muestra un alerta
            return;
        }
    
        try {
            // Realiza la solicitud POST para canjear el cupón
            const response = await fetch(`http://localhost:5000/coupons/canjear/${userIdentifier}/${cuponId}`, {
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
            console.error('Error en la solicitud:', error); // Captura cualquier error de la solicitud
            alert('Hubo un problema al intentar canjear el cupón'); // Muestra una alerta de error
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

export default CouponsView;
