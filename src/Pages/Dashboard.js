// src/pages/Dashboard.js
import React from 'react';
import UserPoints from '../Components/UserPoints';
import LogoutButton from '../Components/LogoutButton'; 

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserPoints /> {/* Agrega el componente de puntos aquí */}
      <LogoutButton /> 
    </div>
  );
};

export default Dashboard;
