import React, { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Login.css';
import { FaGoogle, FaEnvelope, FaLock, FaArrowLeft, FaExclamationTriangle } from 'react-icons/fa';
import axios from 'axios';
import { useAuth } from './AuthContext';

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
      const response = await axios.post('http://localhost:5000/api/customers/login', {
        correo: email,
        pass: password,
      });

      console.log('Inicio de sesión exitoso:', response.data);

      // Si el backend devuelve un token, pásalo a la función login
      const token = response.data.token; // Asegúrate de que el backend devuelva el token en este campo
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
              placeholder="Contraseña"
              value={password}
              onChange={(e) => setPassword(e.target.value)}
              required
            />
          </label>

          <button type="submit" className="login-button" disabled={loading}>
            {loading ? 'Cargando...' : 'Iniciar Sesión'}
          </button>
        </form>

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
