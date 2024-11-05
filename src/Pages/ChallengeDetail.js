import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useParams } from 'react-router-dom';
import ChallengeEditor from '../Components/ChallengeEditor';

const ChallengeDetail = () => {
    const { id } = useParams();
    const [challenge, setChallenge] = useState(null);
    const [error, setError] = useState(null);

    useEffect(() => {
        const fetchChallenge = async () => {
            try {
                const token = localStorage.getItem('access_token');
                const response = await axios.get(`http://localhost:8000/beta/challenges/challenges/${id}`, {
                    headers: {
                        Authorization: `Bearer ${token}`
                    }
                });
                setChallenge(response.data);
            } catch (err) {
                setError('No se pudo cargar el desafío');
            }
        };

        fetchChallenge();
    }, [id]);

    if (error) return <p>{error}</p>;
    if (!challenge) return <p>Cargando...</p>;

    return (
        <div>
            <h2>{challenge.title}</h2>
            <p>{challenge.description}</p>
            <p>Dificultad: {challenge.difficulty}</p>
            <p>Categoría: {challenge.category}</p>
            <p>Lenguaje: {challenge.language}</p>
            <p>Solución: {challenge.solution}</p>
            <p>Prueba: {challenge.test}</p>
            <ChallengeEditor 
                initialTest={challenge.test} 
                initialSolution={challenge.solution} 
                initialLanguage={challenge.language} 
            />
        </div>
    );
};

export default ChallengeDetail;
