import React, { useState, useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);
  const menuRef = useRef(null); // referencia al menú
  const iconRef = useRef(null); // referencia al ícono de hamburguesa

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
        <Link to="/login" className="nav-link" onClick={handleLinkClick}>Iniciar sesión</Link>
        <Link to="/register" className="nav-link" onClick={handleLinkClick}>Registrarse</Link>
      </div>
    </nav>
  );
};

export default Navbar;
