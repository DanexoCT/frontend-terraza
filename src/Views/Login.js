import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaGoogle, FaEnvelope, FaLock, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from './AuthContext';
const apiUrl = process.env.REACT_APP_API_URL_APP

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [loading, setLoading] = useState(false);
  const [errorMessage, setErrorMessage] = useState(''); // Error vacío al iniciar
  const { login } = useAuth(); // Obtén login desde el contexto

  const navigate = useNavigate();

  const handleSubmit = async (event) => {
    event.preventDefault();
    setLoading(true);
    setErrorMessage(''); // Limpia cualquier mensaje de error previo

    try {
      await axios.get(`${apiUrl}/sanctum/csrf-cookie`, { withCredentials: true });

      const response = await axios.post(`${apiUrl}/customer-login`, {
        email: email,
        password: password,
      });


      const token = response.data.token; // Asegúrate de que el backend devuelva el token en este campo
      localStorage.setItem('sanctum_token', token);
      login(token); // Cambia el estado de autenticación a verdadero con el token


      navigate('/'); // Redirecciona después del inicio de sesión exitoso
    } catch (error) {
      if (error.response) {
        setErrorMessage(error.response.data.message || 'Error de autenticación');
      } else if (error.request) {
        setErrorMessage('No se recibió respuesta del servidor.');
      } else {
        setErrorMessage('Error de conexión. Intenta nuevamente más tarde.');
      }
    } finally {
      setLoading(false);
    }
  };
  axios.defaults.withCredentials = true;
  useEffect(() => {
    // Limpia el mensaje de error cuando se desmonta el componente
    return () => {
      setErrorMessage('');
    };
  }, []);

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
