import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import './Navbar.css';

const Navbar = () => {
  const [isOpen, setIsOpen] = useState(false);

  const toggleMenu = () => {
    setIsOpen(!isOpen);
  };

  return (
    <nav className="navbar-main">
      <img
        src="/images/La-terraza-Shade-Logo.png"
        alt="LaTerraza Logo"
        className="logo-image"
      />
      
      {/* Icono de menú de hamburguesa */}
      <div className="menu-icon" onClick={toggleMenu}>
        <div className="bar"></div>
        <div className="bar"></div>
        <div className="bar"></div>
      </div>

      {/* Enlaces de navegación */}
      <div className={`nav-links ${isOpen ? 'open' : ''}`}>
        <Link to="/login" className="nav-link">Iniciar sesión</Link>
        <Link to="/register" className="nav-link">Registrarse</Link>
      </div>
    </nav>
  );
};

export default Navbar;