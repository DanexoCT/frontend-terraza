import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaGoogle, FaEnvelope, FaLock, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import { useAuth } from './AuthContext';
import { loginCustomer, loginWithGoogle } from '../services/authServices.js';
import { GoogleLogin } from "@react-oauth/google";

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Error vacío al iniciar
  const { login } = useAuth();
  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Limpia cualquier mensaje de error previo

    try {

      const { token } = await loginCustomer(email, password);
      login(token);
      navigate('/');
    } catch (error) {
      setErrorMessage(error.message);
    } finally {
      setLoading(false);
    }
  };
  useEffect(() => {
    // Limpia el mensaje de error cuando se desmonta el componente
    return () => {
      setErrorMessage('');
    };
  }, []);
  const handleGoogleSuccess = async (credentialResponse) => {
    try {
      const { credential } = credentialResponse;
      const { token } = await loginWithGoogle(credential);
      login(token); // desde tu contexto
      navigate('/');
    } catch (error) {
      console.error('Google login error:', error.message);
      setErrorMessage(error.message);
    }
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Iniciar Sesión</h2><br />
        <form onSubmit={handleSubmit}>
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
          </label>

          {errorMessage && (
            <div className="login-tooltip">
              <FaExclamationTriangle className="warning-icon" /> {errorMessage}
            </div>
          )}

          <label className="input-label">
            <FaLock className="input-icon" />
            <input
              type="password"
              name='password'
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
              autoComplete='current-password'
            />
          </label>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
          <GoogleLogin
            onSuccess={handleGoogleSuccess}
            onError={() => setErrorMessage("Error al iniciar sesión con Google.")}
            useOneTap
            render={(renderProps) => (
              <button
                type="button"
                onClick={renderProps.onClick}
                disabled={renderProps.disabled}
              >
                <FaGoogle className="google-icon" /> Iniciar sesión con Google
              </button>
            )}

          />



        </form>

        <div className="forgot-password">
          <Link to="/forgot-password">¿Se te olvidó la contraseña?</Link>
        </div>

        <div className="create-account">
          <p>¿Necesitas una cuenta? <Link to="/register">Crear cuenta</Link></p>
        </div>

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
