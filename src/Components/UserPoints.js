import React, { useEffect, useState } from 'react';
import axios from 'axios';

const UserPoints = () => {
  const [points, setPoints] = useState(0);
  const [error, setError] = useState(null);

  const fetchPoints = async () => {
    try {
      const token = localStorage.getItem('access_token');
      const response = await axios.get('http://localhost:8000/beta/access/userpoints/', {
        headers: { Authorization: `Bearer ${token}` }
      });
      setPoints(response.data.points); 
    } catch (error) {
      setError('Error al obtener los puntos');
    }
  };

  const incrementPoints = async () => {
    try {
      const token = localStorage.getItem('access_token');
      await axios.post('http://localhost:8000/beta/access/incrementpoints/', {}, {
        headers: { Authorization: `Bearer ${token}` }
      });
      fetchPoints();
    } catch (error) {
      setError('Error al incrementar los puntos');
    }
  };

  useEffect(() => {
    fetchPoints();
  }, []);

  return (
    <div>
      <h2>Puntos del Usuario: {points}</h2>
      <button onClick={incrementPoints}>Incrementar Puntos</button>
      {error && <p>{error}</p>}
    </div>
  );
};

export default UserPoints;
