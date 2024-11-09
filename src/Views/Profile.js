import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useAuth } from './AuthContext';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const { token } = useAuth(); // Obtén el token de autenticación del contexto

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers/profile', {
          headers: {
            Authorization: `Bearer ${token}`, // Incluye el token en el encabezado
          },
        });
        setProfileData(response.data);
      } catch (error) {
        setError('Error al cargar el perfil. Por favor intenta nuevamente.');
      }
    };

    fetchProfileData();
  }, [token]);

  if (error) {
    return <div>{error}</div>;
  }

  if (!profileData) {
    return <div>Cargando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <h2>Mi Perfil</h2>
      <p><strong>Nombre:</strong> {profileData.nombre}</p>
      <p><strong>Apellido Paterno:</strong> {profileData.apellidoP}</p>
      <p><strong>Apellido Materno:</strong> {profileData.apellidoM}</p>
      <p><strong>Correo:</strong> {profileData.correo}</p>
      <p><strong>Confirmado:</strong> {profileData.confirmado ? 'Sí' : 'No'}</p>
      <p><strong>Fecha de creación:</strong> {new Date(profileData.created_at).toLocaleDateString()}</p>
      {profileData.imagen && (
        <div>
          <strong>Imagen:</strong>
          <img src={profileData.imagen} alt="Imagen de perfil" className="profile-image" />
        </div>
      )}
    </div>
  );
};

export default Profile;
