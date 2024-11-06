import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom'; // Importa useNavigate
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [email, setEmail] = useState('');
  const [emailErrorMessage, setEmailErrorMessage] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generalErrorMessage, setGeneralErrorMessage] = useState('');

  const navigate = useNavigate(); // Hook de navegación

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (password !== confirmPassword) {
      setConfirmPasswordError('La contraseña no coincide');
      return;
    } else {
      setConfirmPasswordError('');
    }

    const customerData = {
      nombre: firstName,
      apellidoP: lastName,
      apellidoM: secondLastName,
      correo: email,
      pass: password,
    };

    try {
      const response = await fetch('http://localhost:5000/api/customers/register', {
        method: 'POST',
        headers: { 'Content-Type': 'application/json' },
        body: JSON.stringify(customerData),
      });

      const result = await response.json();

      setSuccessMessage('');
      setEmailErrorMessage('');
      setGeneralErrorMessage('');

      if (response.ok) {
        setSuccessMessage(result.message);
        setTimeout(() => {
          setSuccessMessage('');
          navigate('/login'); // Redirecciona al login después de 3 segundos
        }, 3000);
      } else {
        if (result.message === 'Ya existe una cuenta con este correo.') {
          setEmailErrorMessage(result.message);
        } else {
          setGeneralErrorMessage(result.message || 'Error al registrar');
        }
      }
    } catch (error) {
      console.error('Error al enviar el formulario:', error);
      setGeneralErrorMessage('Error al enviar el formulario');
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <label className="input-label">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Nombre(s)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Apellido Paterno"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Apellido Materno"
              value={secondLastName}
              onChange={(e) => setSecondLastName(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Correo"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Repetir Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
              className={confirmPasswordError ? 'error' : ''}
            />
            {confirmPasswordError && (
              <div className="tooltip">
                <FaExclamationTriangle className="warning-icon" /> {confirmPasswordError}
              </div>
            )}
          </label>
          <button type="submit" className="register-button">Registrarse</button>
        </form>

        {successMessage && <div className="message success">{successMessage}</div>}
        {emailErrorMessage && (
          <div className="tooltip email-error-tooltip">
            <FaExclamationTriangle className="warning-icon" /> {emailErrorMessage}
          </div>
        )}
        {generalErrorMessage && <div className="message general-error">{generalErrorMessage}</div>}

        <div className="back-to-home">
          <Link to="/">
            <FaArrowLeft className="back-icon" /> Volver al menú
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
