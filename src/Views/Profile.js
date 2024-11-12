import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { BrowserRouter as Router, Route, Routes, useLocation, useNavigate } from 'react-router-dom';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [error, setError] = useState('');
  const navigate = useNavigate();
  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        const response = await axios.get('http://localhost:5000/api/customers/profile', { withCredentials: true })

        setProfileData(response.data.profileData)
      } catch (error) {
        console.error('Error al cargar el perfil', error)
        setError('Error al cargar el perfil. Intentar de nuevo')
        navigate('/login')
      }
    }
    fetchProfileData()
  }, [navigate])


  axios.defaults.withCredentials = true;

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
      {profileData.imagen && (
        <div>
          <strong>Imagen:</strong>
          <img src={profileData.imagen} alt="Imagen de perfil" className="profile-image" />
        </div>
      )}
    </div>
  );
};

export default Profile;