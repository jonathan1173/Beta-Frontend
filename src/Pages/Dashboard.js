// src/pages/Dashboard.js
import React from 'react';
import UserPoints from '../Components/UserPoints';

const Dashboard = () => {
  return (
    <div>
      <h1>Dashboard</h1>
      <UserPoints /> {/* Agrega el componente de puntos aquí */}
    </div>
  );
};

export default Dashboard;
