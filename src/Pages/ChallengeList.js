import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { Link } from 'react-router-dom';

const ChallengesList = () => {
  const [challenges, setChallenges] = useState([]);
  const [error, setError] = useState(null);

  useEffect(() => {
    const fetchChallenges = async () => {
      try {
        const token = localStorage.getItem('access_token');
        const response = await axios.get('http://localhost:8000/beta/challenges/challenges/', {
          headers: {
            Authorization: `Bearer ${token}`
          }
        });
        setChallenges(response.data.results);  
      } catch (err) {
        setError('No se pudieron cargar los desafíos');
      }
    };

    fetchChallenges();
  }, []);

  if (error) return <p>{error}</p>;

  return (
    <div>
      <h2>Lista de Desafíos</h2>
      <ul>
        {challenges.map((challenge) => (
          <li key={challenge.id}>
            <Link to={`/challenges/${challenge.id}`}>{challenge.title}</Link>
          </li>
        ))}
      </ul>
    </div>
  );
};

export default ChallengesList;
