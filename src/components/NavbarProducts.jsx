import React, { useState } from 'react';
import '../css/NavbarProducts.css'
import { Link } from 'react-router-dom';

function NavbarProducts() {
  const [activeSection, setActiveSection] = useState('');

  return (
    <nav className="navbar">
      <ul className="navbar-list">
        <li
          className={activeSection === 'platillos' ? 'active' : ''}
        >
          <Link to="/" onClick={() => setActiveSection('platillos')}>
            Platillos
          </Link>
        </li>
        <li
          className={activeSection === 'bebidas' ? 'active' : ''}
        >
          <Link to="/bebidas" onClick={() => setActiveSection('bebidas')}>
            Bebidas
          </Link>
        </li>
        <li
          className={activeSection === 'otros' ? 'active' : ''}
        >
          <Link to="/otros" onClick={() => setActiveSection('otros')}>
            Otros
          </Link>
        </li>
      </ul>
    </nav>
  );
}

export default NavbarProducts;

