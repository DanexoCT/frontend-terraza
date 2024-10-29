import React from 'react';
import './Footer.css';
import { FontAwesomeIcon } from '@fortawesome/react-fontawesome';
import { faMapMarkerAlt, faPhone, faEnvelope } from '@fortawesome/free-solid-svg-icons';

function Footer() {
  return (
    <footer className="footer">

      <div className="footer-container">

        <div className="footer-section">
        <h3>Contacto</h3>
          <p>
            <FontAwesomeIcon icon={faMapMarkerAlt} /> Calz. Independencia Norte 5075, Huentitán El Bajo, 44250 Guadalajara, Jal.
          </p>
          <p>
            <FontAwesomeIcon icon={faPhone} /> +52 33 2926 0035
          </p>
        </div>

        <div className="footer-section">
          <h3>Horario</h3>
          <p>Lunes a Viernes: 09:00 am - 04:00 pm</p>
          <p>Sábado y Domingo: Cerrado</p>
        </div>

      </div>

      <div className="footer-bottom">
        <p>© {new Date().getFullYear()} HiQNet - Todos los derechos reservados</p>
      </div>

    </footer>
  );
}

export default Footer;
