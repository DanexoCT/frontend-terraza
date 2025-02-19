import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea el contexto de autenticación
const AuthContext = createContext();

// Crea el hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(false);

  // Al cargar el componente, revisa si existe un token en el localStorage o cookies
  useEffect(() => {
    const storedToken = localStorage.getItem('authToken'); // O puedes usar cookies
    if (storedToken) {
      setIsAuthenticated(true);
    }
  }, []);

  const login = () => {
    setIsAuthenticated(true);
    localStorage.setItem('authToken', '_token'); // Guarda el token en localStorage o cookies
  };

  const logout = () => {
    setIsAuthenticated(false);
    localStorage.removeItem('authToken'); // Elimina el token al cerrar sesión
  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};