import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './AuthContext'; // Usa el hook useAuth

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null);
  const iconRef = useRef(null);
  const { isAuthenticated, logout } = useAuth(); // Accede al contexto
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

    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, []);

  // Cierra el menú cuando se hace clic en un enlace de navegación
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
            <Link to="/profile" className="nav-link" onClick={() => setIsOpen(false)}>Perfil</Link>
            <button onClick={handleLogout} className="nav-link logout-button">Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={() => setIsOpen(false)}>Iniciar sesión</Link>
            <Link to="/register" className="nav-link" onClick={() => setIsOpen(false)}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;