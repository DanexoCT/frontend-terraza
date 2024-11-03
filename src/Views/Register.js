import React, { useState } from 'react';
import { Link } from 'react-router-dom';
import { FaUser, FaEnvelope, FaLock, FaArrowLeft } from 'react-icons/fa';
import './Register.css';

const Register = () => {
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [secondLastName, setSecondLastName] = useState('');
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');

  const handleSubmit = (event) => {
    event.preventDefault();
    // Aquí puedes manejar la lógica para enviar los datos
    console.log('First Name:', firstName);
    console.log('Last Name:', lastName);
    console.log('Second Last Name:', secondLastName);
    console.log('Email:', email);
    console.log('Password:', password);
    console.log('Confirm Password:', confirmPassword);
  };

  return (
    <div className="auth-wrapper">
      <div className="auth-container">
        <h2>Registrarse</h2>
        <form onSubmit={handleSubmit}>
          <label className="input-label">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Nombre(s)"
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Apellido Paterno"
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            <FaUser className="input-icon" />
            <input
              type="text"
              placeholder="Apellido Materno"
              value={secondLastName}
              onChange={(e) => setSecondLastName(e.target.value)}
              required
            />
          </label>
          <label className="input-label">
            <FaEnvelope className="input-icon" />
            <input
              type="email"
              placeholder="Email"
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              required
            />
          </label>
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
          <label className="input-label">
            <FaLock className="input-icon" />
            <input
              type="password"
              placeholder="Repetir Contraseña"
              value={confirmPassword}
              onChange={(e) => setConfirmPassword(e.target.value)}
              required
            />
          </label>
          <button type="submit" className="register-button">Registrarse</button>
        </form>
        <div className="back-to-home">
          <Link to="/">
            <FaArrowLeft className="back-icon" /> Volver al menú de inicio
          </Link>
        </div>
      </div>
    </div>
  );
};

export default Register;
