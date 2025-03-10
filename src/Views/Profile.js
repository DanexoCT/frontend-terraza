import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { FaEdit, FaSave, FaUser, FaEnvelope, FaIdCard, FaAward } from 'react-icons/fa';
import './Profile.css';
const apiUrl = process.env.REACT_APP_API_URL_APP

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [isEditing, setIsEditing] = useState({
    nombre: false,
    apellidoP: false,
    apellidoM: false,
    imagen: false,
  });
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [updatedData, setUpdatedData] = useState({});
  const [loading, setLoading] = useState(false);

  useEffect(() => {
    const fetchProfileData = async () => {
      try {
        // Obtener el token de localStorage
        const token = localStorage.getItem('sanctum_token');
        console.log('Token:', token);

        // Verificar si el token está disponible
        if (!token) {
          console.log('No token found, please log in.');
          return;
        }

        // Hacer la solicitud al perfil del cliente con el token
        const response = await axios.get(`${apiUrl}/customer-perfil`, {
          headers: {
            'Authorization': `Bearer ${token}`, // Incluir el token en las cabeceras
            'Content-Type': 'application/json',
          },
        });

        // Establecer los datos del perfil en el estado
        setProfileData(response.data);
      } catch (error) {
        console.error('Error al cargar el perfil', error);
        setError('Error al cargar el perfil. Por favor, intenta de nuevo.');
      }
    };

    fetchProfileData();
  }, []);

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field, value) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));
  };

  axios.defaults.withCredentials = true;

  const handleSave = async (field) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      let updatedField;
      let config = { withCredentials: true };

      if (field === 'imagen' && updatedData.imagen) {
        // Si es una imagen, usar FormData
        const formData = new FormData();
        formData.append('imagen', updatedData.imagen);

        updatedField = formData;
        config.headers = {
          'Content-Type': 'multipart/form-data',
        };
      } else {
        // Si no es una imagen, usar datos JSON normales
        updatedField = { [field]: updatedData[field] || profileData[field] };
      }

      // Enviar solicitud PUT con el ID del cliente en la URL
      const response = await axios.put(`
        http://localhost:5000/api/customers/update-customer/${profileData.id}`,
        updatedField,
        config
      );

      // Actualizar los datos del perfil localmente
      setProfileData((prev) => ({ ...prev, ...updatedField }));
      setIsEditing((prev) => ({ ...prev, [field]: false }));
      setSuccessMessage(response.data.message || 'Cambios guardados exitosamente.');
      // Recargar la ventana después de guardar
      if (field === 'imagen') {
        window.location.reload();
      }
    } catch (error) {
      console.error('Error al actualizar el perfil', error);
      setError(error.response?.data?.message || 'No se pudo guardar el cambio. Intenta de nuevo.');
    } finally {
      setLoading(false);
    }
  };
  const imagen = (profileData && profileData.imagen)
    ? profileData.imagen
    : 'https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png';



  if (!profileData) {
    return <div className="loading-message">Cargando perfil...</div>;
  }

  return (
    <div className="profile-container">
      <div className="profile-card">
        {/* Imagen */}
        <div className="profile-header">
          {isEditing.imagen ? (
            <>
              <input
                type="file"
                accept="image/*"
                className="image-input"
                onChange={(e) => handleInputChange('imagen', e.target.files[0])}
              />
              <button className="save-button" onClick={() => handleSave('imagen')}>
                <FaSave /> Guardar
              </button>
            </>
          ) : (
            <>
              <img
                src={imagen}
                alt="Imagen de perfil"
                className="profile-image"
              />
              <button className="edit-button-image" onClick={() => handleEditToggle('imagen')}>
                <FaEdit />
              </button>
            </>
          )}
        </div>

        {/* Información del perfil */}
        <div className="profile-body">
          <div className="form-group" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FaUser className="input-icon-profile-pj" style={{ marginRight: "10px" }} /> {/* Icono antes de la etiqueta */}
            <label>Nombre(s): </label>
            {isEditing.nombre ? (
              <>
                <input
                  type="text"
                  value={updatedData.nombre || profileData.nombre}
                  onChange={(e) => handleInputChange('nombre', e.target.value)}
                  className="form-input"
                />
                <button className="save-button" onClick={() => handleSave('nombre')}>
                  <FaSave /> Guardar
                </button>
              </>
            ) : (
              <>
                <span>{profileData.nombre}</span>
                <button className="edit-button" onClick={() => handleEditToggle('nombre')}>
                  <FaEdit />
                </button>
              </>
            )}
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FaUser className="input-icon-profile-pj" style={{ marginRight: "10px" }} /> {/* Icono antes de la etiqueta */}
            <label>Apellido Paterno: </label>
            {isEditing.apellidoP ? (
              <>
                <input
                  type="text"
                  value={updatedData.apellidoP || profileData.apellidoP}
                  onChange={(e) => handleInputChange('apellidoP', e.target.value)}
                  className="form-input"
                />
                <button className="save-button" onClick={() => handleSave('apellidoP')}>
                  <FaSave /> Guardar
                </button>
              </>
            ) : (
              <>
                <span>{profileData.apellidoP}</span>
                <button className="edit-button" onClick={() => handleEditToggle('apellidoP')}>
                  <FaEdit />
                </button>
              </>
            )}
          </div>

          <div className="form-group" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FaUser className="input-icon-profile-pj" style={{ marginRight: "10px" }} /> {/* Icono antes de la etiqueta */}
            <label>Apellido Materno: </label>
            {isEditing.apellidoM ? (
              <>
                <input
                  type="text"
                  value={updatedData.apellidoM || profileData.apellidoM}
                  onChange={(e) => handleInputChange('apellidoM', e.target.value)}
                  className="form-input"
                />
                <button className="save-button" onClick={() => handleSave('apellidoM')}>
                  <FaSave /> Guardar
                </button>
              </>
            ) : (
              <>
                <span>{profileData.apellidoM}</span>
                <button className="edit-button" onClick={() => handleEditToggle('apellidoM')}>
                  <FaEdit />
                </button>
              </>
            )}
          </div>


          <div className="form-group">
            <label>Correo: </label>
            <FaEnvelope className="input-icon-profile" /> {/* Icono antes del campo */}
            <span>{profileData.email}</span>
          </div>

          <div className="form-group">
            <label>Identificador: </label>
            <FaIdCard className="input-icon-profile" /> {/* Icono antes del campo */}
            <span>{profileData.userIdentifier}</span>
          </div>

          <div className="form-group">
            <label>Puntos: </label>
            <FaAward className="input-icon-profile" /> {/* Icono antes del campo */}
            <span>{profileData.puntosAcumulados}</span>
          </div>

          {/* Mensajes dinámicos */}
          <div className="message-container">
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;