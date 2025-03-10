import React, { createContext, useState, useContext, useEffect } from 'react';

// Crea el contexto de autenticación
const AuthContext = createContext();

// Crea el hook para usar el contexto
export const useAuth = () => {
  return useContext(AuthContext);
};

// Proveedor del contexto
export const AuthProvider = ({ children }) => {
  const [isAuthenticated, setIsAuthenticated] = useState(
    !!localStorage.getItem('sanctum_token') // Verifica si el token existe al iniciar
  );


  // Al cargar el componente, revisa si existe un token en el localStorage o cookies
  useEffect(() => {
    const token = localStorage.getItem('sanctum_token');
    if (!token && isAuthenticated) {
      setIsAuthenticated(false); // Evita el bucle asegurando que el estado cambie primero
      window.location.href = '/';
    }
  }, [isAuthenticated]);

  const login = (token) => {
    localStorage.setItem('sanctum_token', token); // Guarda el token en localStorage o cookies
    setIsAuthenticated(true);
  };

  const logout = (token) => {
    localStorage.removeItem('sanctum_token'); // Elimina el token al cerrar sesión    setIsAuthenticated(false);
    setIsAuthenticated(false);

  };

  return (
    <AuthContext.Provider value={{ isAuthenticated, login, logout }}>
      {children}
    </AuthContext.Provider>
  );
};