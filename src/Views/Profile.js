import React, { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { getCustomerProfile, updateCustomerProfile } from '../services/profileServices';
import { FaEdit, FaSave, FaUser, FaEnvelope, FaIdCard, FaAward } from 'react-icons/fa';
import './Profile.css';

const Profile = () => {
  const [profileData, setProfileData] = useState(null);
  const [updatedData, setUpdatedData] = useState({});
  const [isEditing, setIsEditing] = useState({});
  const [error, setError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [loading, setLoading] = useState(false);
  const [previewImage, setPreviewImage] = useState(null);

  const navigate = useNavigate();

  useEffect(() => {
    const storedProfile = sessionStorage.getItem('customerProfile');
    if (storedProfile) {
      setProfileData(JSON.parse(storedProfile));
    } else {
      const fetchProfile = async () => {
        try {
          const data = await getCustomerProfile();
          setProfileData(data);
          sessionStorage.setItem('customerProfile', JSON.stringify(data));
        } catch (error) {
          if (error.message === 'Token no encontrado') {
            navigate('/login');
          } else {
            setError('Error al cargar el perfil. Intenta nuevamente.');
          }
        }
      };

      fetchProfile();
    }
  }, [navigate]);

  const handleEditToggle = (field) => {
    setIsEditing((prev) => ({ ...prev, [field]: !prev[field] }));
  };

  const handleInputChange = (field, value) => {
    setUpdatedData((prev) => ({ ...prev, [field]: value }));

    if (field === 'imagen' && value) {
      const fileReader = new FileReader();
      fileReader.onload = () => {
        setPreviewImage(fileReader.result);
      };
      fileReader.readAsDataURL(value);
    }
  };

  const handleSave = async (field) => {
    setLoading(true);
    setError('');
    setSuccessMessage('');

    try {
      if (field === 'imagen' && !updatedData.imagen) {
        setError('Por favor selecciona una imagen.');
        setLoading(false);
        return;
      }

      const update = field === 'imagen'
        ? { imagen: updatedData.imagen }
        : { [field]: updatedData[field] || profileData[field] };

      const response = await updateCustomerProfile(profileData.id, update);

      if (field === 'imagen') {
        const updatedProfile = await getCustomerProfile();
        setProfileData(updatedProfile);
        sessionStorage.setItem('customerProfile', JSON.stringify(updatedProfile));
        setPreviewImage(null);
        setUpdatedData((prev) => ({ ...prev, imagen: null }));
      } else {
        const newProfile = { ...profileData, ...update };
        setProfileData(newProfile);
        sessionStorage.setItem('customerProfile', JSON.stringify(newProfile));
      }

      setSuccessMessage(response.message || 'Actualizado correctamente.');
      setIsEditing((prev) => ({ ...prev, [field]: false }));
    } catch (err) {
      setError(err.message || 'Error al actualizar los datos.');
    } finally {
      setLoading(false);
    }
  };

  const imagen = (previewImage || (profileData && profileData.imagen))
    ? (previewImage || profileData.imagen)
    : 'https://static-00.iconduck.com/assets.00/user-icon-2046x2048-9pwm22pp.png';

  if (!profileData) return <div className="loading-message">Cargando perfil...</div>;

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
              {previewImage && (
                <img
                  src={previewImage}
                  alt="Vista previa"
                  className="profile-image"
                  style={{ marginTop: '10px' }}
                />
              )}
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
          {/* Nombre */}
          <div className="form-group" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FaUser className="input-icon-profile-pj" style={{ marginRight: "10px" }} />
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

          {/* Apellido Paterno */}
          <div className="form-group" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FaUser className="input-icon-profile-pj" style={{ marginRight: "10px" }} />
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

          {/* Apellido Materno */}
          <div className="form-group" style={{ display: "flex", alignItems: "center", marginBottom: "20px" }}>
            <FaUser className="input-icon-profile-pj" style={{ marginRight: "10px" }} />
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

          {/* Correo */}
          <div className="form-group">
            <label>Correo: </label>
            <FaEnvelope className="input-icon-profile" />
            <span>{profileData.email}</span>
          </div>

          {/* Identificador */}
          <div className="form-group">
            <label>Identificador: </label>
            <FaIdCard className="input-icon-profile" />
            <span>{profileData.userIdentifier}</span>
          </div>

          {/* Puntos */}
          <div className="form-group">
            <label>Puntos: </label>
            <FaAward className="input-icon-profile" />
            <span>{profileData.puntosAcumulados}</span>
          </div>

          {/* Mensajes dinámicos */}
          <div className="message-container">
            {error && <div className="error-message">{error}</div>}
            {successMessage && <div className="success-message">{successMessage}</div>}
            {loading && <div className="loading-message">Actualizando...</div>}
          </div>
        </div>
      </div>
    </div>
  );
};

export default Profile;
