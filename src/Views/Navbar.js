import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './AuthContext'; // Usa el hook useAuth
import { fetchUserProfile } from './Services.js';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const [puntos, setPuntos] = useState(0); // Estado para los puntos acumulados
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const { isAuthenticated, logout, getUserPoints } = useAuth(); // Accede al contexto
  const [activeSection, setActiveSection] = useState('');
  const navigate = useNavigate();


  const toggleMenu = () => {
    setIsOpen((prevIsOpen) => !prevIsOpen);
  };

  // Cierra el menú cuando se hace clic fuera del menú o ícono
  useEffect(() => {
    const handleClickOutside = (event) => {
      if (
        menuRef.current &&
        !menuRef.current.contains(event.target) &&
        iconRef.current &&
        !iconRef.current.contains(event.target)
      ) {
        setIsOpen(false);
      }
    };

    document.addEventListener('mousedown', handleClickOutside);

    return () => {
      document.removeEventListener('mousedown', handleClickOutside);
    };
  }, []);

  // Obtiene los puntos acumulados cuando el usuario está autenticado
  useEffect(() => {
    const loadUserPoints = async () => {
      if (isAuthenticated) {
        try {
          const profileData = await fetchUserProfile();
          setPuntos(profileData.puntos); // Asumiendo que 'puntosAcumulados' es el campo para los puntos
        } catch (error) {
          console.error('Error obteniendo los puntos:', error);
        }
      }
    };
    loadUserPoints();
  }, [isAuthenticated]);

  const handleLogout = () => {
    logout();
    navigate('/login');
  };

  return (
    <nav className="navbar-main">
      <img src="/images/La-terraza-Shade-Logo.png" alt="LaTerraza Logo" className="logo-image" />
      <div ref={iconRef} className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>
      <div ref={menuRef} className={`nav-links ${isOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <>
            <span className="nav-points">Puntos: {puntos}</span>
            <Link
              to="/coupons"
              className={`nav-link ${activeSection === 'coupons' ? 'active' : ''}`}
              onClick={() => setActiveSection('coupons')}
            >
              Cupones
            </Link>

            <Link
              to="/yourCoupons"
              className={`nav-link ${activeSection === 'yourCoupons' ? 'active' : ''}`}
              onClick={() => setActiveSection('yourCoupons')}
            >
              Tus Cupones
            </Link>

            <Link
              to="/"
              className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveSection('menu')}
            >
              Menú
            </Link>

            <Link
              to="/profile"
              className={`nav-link ${activeSection === 'profile' ? 'active' : ''}`}
              onClick={() => setActiveSection('profile')}
            >
              Perfil
            </Link>
            <button onClick={handleLogout} className="nav-link logout-button">Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link
              to="/"
              className={`nav-link ${activeSection === 'menu' ? 'active' : ''}`}
              onClick={() => setActiveSection('menu')}
            >
              Menú
            </Link>

            <Link 
              to="/login" 
              className={`nav-link ${activeSection === 'login' ? 'active' : ''}`}
              onClick={() => setActiveSection('login')}>
                Iniciar sesión
            </Link>

            <Link 
              to="/register" 
              className={`nav-link ${activeSection === 'register' ? 'active' : ''}`}
              onClick={() => setActiveSection('register')}>
                Registrarse
            </Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
