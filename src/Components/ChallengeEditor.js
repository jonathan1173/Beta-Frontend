import React, { useState } from 'react';
import axios from 'axios';
import CodeEditor from '../Api/CodeEditor';

const ChallengeEditor = ({ initialTest, initialSolution, initialLanguage }) => {
    const [testContent, setTestContent] = useState(initialTest);
    const [solutionContent, setSolutionContent] = useState(initialSolution);
    const [output, setOutput] = useState("");

    const handleTestChange = (value) => {
        setTestContent(value);
    };

    const handleSolutionChange = (value) => {
        setSolutionContent(value);
    };

    const handleRunTests = async () => {
        try {
            const token = localStorage.getItem('access_token');
            const response = await axios.post(
                "http://localhost:8000/beta/challenges/test-challenge/",
                { test: testContent, solution: solutionContent },
                {
                    headers: {
                        Authorization: `Bearer ${token}`, 
                    },
                }
            );
            setOutput(response.data.output);
        } catch (error) {
            console.error("Error en handleRunTests:", error);
            if (error.response) {
                setOutput(`Error en el servidor: ${error.response.data}`);
            } else if (error.request) {
                setOutput("Error de conexión o problema de CORS: No se recibió respuesta del servidor.");
            } else {
                setOutput(`Error desconocido: ${error.message}`);
            }
        }
    };

    return (
        <div>
            <h2>Editor de Desafío</h2>
            <h3>Código de Prueba</h3>
            <CodeEditor
                value={testContent}
                onChange={handleTestChange}
                language={initialLanguage}
                theme="vs-dark"
            />
            <h3>Solución</h3>
            <CodeEditor
                value={solutionContent}
                onChange={handleSolutionChange}
                language={initialLanguage}
                theme="vs-dark"
            />
            <button onClick={handleRunTests}>Ejecutar Pruebas</button>
            <h3>Resultados</h3>
            <pre>{output}</pre>
        </div>
    );
};

export default ChallengeEditor;
