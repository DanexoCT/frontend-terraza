import React, { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import { registerCustomer } from '../services/authServices.js';
import '../css/Register.css';

const Register = () => {
  const [nombre, setNombre] = useState('');
  const [apellidoP, setApellidoP] = useState('');
  const [apellidoM, setApellidoM] = useState('');
  const [email, setEmail] = useState('');
  const [emailError, setEmailError] = useState(false);
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [confirmPasswordError, setConfirmPasswordError] = useState('');
  const [successMessage, setSuccessMessage] = useState('');
  const [generalErrorMessage, setGeneralErrorMessage] = useState('');

  const navigate = useNavigate();

  const validateEmail = (email) => {
    const emailRegex = /^[\w.-]+@(gmail|hotmail|outlook|yahoo)\.com$/i;
    return emailRegex.test(email);
  };

  const handleSubmit = async (event) => {
    event.preventDefault();

    if (!validateEmail(email)) {
      setEmailError(true);
      return;
    } else {
      setEmailError(false);
    }

    if (password !== confirmPassword) {
      setConfirmPasswordError('La contraseña no coincide');
      return;
    } else {
      setConfirmPasswordError('');
    }

    const customerData = {
      nombre: nombre,
      apellidoP: apellidoP,
      apellidoM: apellidoM,
      email: email,
      password: password,
    };

    try {
      const result = await registerCustomer(customerData);
      setSuccessMessage(result.message);
      setGeneralErrorMessage('');
      setTimeout(() => {
        navigate('/login');
      }, 3000); // Redirige después de 3 segundos
    } catch (error) {
      setGeneralErrorMessage(error.message);
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
              value={nombre}
              onChange={(e) => setNombre(e.target.value)}
              required
            />
          </label>

          <label className="input-label">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Apellido Paterno (Opcional)"
              value={apellidoP}
              onChange={(e) => setApellidoP(e.target.value)}
            />
          </label>

          <label className="input-label">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Apellido Materno (Opcional)"
              value={apellidoM}
              onChange={(e) => setApellidoM(e.target.value)}
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
              autoComplete='email'
            />
            {emailError && (
              <div className="tooltip email-error-tooltip">
                <FaExclamationTriangle className="warning-icon" />
                Por favor, ingresa un correo válido (Gmail, Hotmail, Outlook o Yahoo).
              </div>
            )}
          </label>

          <label className="input-label">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='current-password'
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
              autoComplete='current-password'
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