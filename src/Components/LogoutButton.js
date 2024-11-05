import React from 'react';
import { useNavigate } from 'react-router-dom';
import { useAuth } from '../Api/AuthContext';

const LogoutButton = () => {
  const navigate = useNavigate();
  const { logout } = useAuth(); 

  const handleLogout = () => {
    localStorage.removeItem('access_token');
    localStorage.removeItem('refresh_token');
    
    logout(); 
    navigate('/'); 
  };

  return (
    <button onClick={handleLogout}>
      Cerrar Sesión
    </button>
  );
};

export default LogoutButton;
