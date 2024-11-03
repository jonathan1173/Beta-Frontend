// src/components/LogoutButton.js
import React from 'react';
import { useNavigate } from 'react-router-dom';

const LogoutButton = () => {
  const navigate = useNavigate();

  const handleLogout = () => {
    // Eliminar tokens del almacenamiento local
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    // Redirigir al usuario a la página de login
    navigate('/login');
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
