import React, { useState, useEffect, useRef } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import './Navbar.css';
import { useAuth } from './AuthContext'; // Importa el contexto de autenticación

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // referencia al menú
  const iconRef = useRef(null); // referencia al ícono de hamburguesa
  const { isAuthenticated, logout } = useAuth(); // Obtén el estado de autenticación y la función de cierre de sesión del contexto
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
  const handleLinkClick = () => {
    setIsOpen(false);
  };

  // Maneja el cierre de sesión
  const handleLogout = () => {
    logout(); // Llama a la función logout del contexto
    navigate('/login'); // Redirecciona al usuario a la página de login después de cerrar sesión
  };

  return (
    <nav className="navbar-main">
      <img
        src="/images/La-terraza-Shade-Logo.png"
        alt="LaTerraza Logo"
        className="logo-image"
      />

      {/* Icono de menú de hamburguesa */}
      <div ref={iconRef} className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Enlaces de navegación */}
      <div ref={menuRef} className={`nav-links ${isOpen ? 'open' : ''}`}>
        {isAuthenticated ? (
          <>
            <Link to="/profile" className="nav-link" onClick={handleLinkClick}>Perfil</Link>
            <button onClick={handleLogout} className="nav-link logout-button">Cerrar sesión</button>
          </>
        ) : (
          <>
            <Link to="/login" className="nav-link" onClick={handleLinkClick}>Iniciar sesión</Link>
            <Link to="/register" className="nav-link" onClick={handleLinkClick}>Registrarse</Link>
          </>
        )}
      </div>
    </nav>
  );
};

export default Navbar;
