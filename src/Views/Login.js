import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Login.css';
import { FaGoogle, FaArrowLeft, FaEnvelope, FaLock } from 'react-icons/fa'; // Importa los iconos que necesitas

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    console.log('Email:', email);
    console.log('Password:', password);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Iniciar Sesión</h2>
        <form onSubmit={handleSubmit}>
          <label className="input-label">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
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
          <button type="submit" className="login-button">Iniciar Sesión</button>
          <button className="google-login">
            <FaGoogle /> Iniciar Sesión con Google
          </button>
        </form>

        <div className="forgot-password">
          <Link to="/forgot-password">¿Se te olvidó la contraseña?</Link>
        </div>

        <div className="create-account">
          <p>¿Necesitas una cuenta? <Link to="/register">Crear cuenta</Link></p>
        </div>

        {/* Enlace para volver al menú de inicio, ahora dentro del contenedor de autenticación */}
        <div className="back-to-home">
          <Link to="/">
            <FaArrowLeft className="back-icon" /> Volver al menú
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Login;
