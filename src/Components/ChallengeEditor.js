import React, { useState } from 'react';
import CodeEditor from '../Api/CodeEditor';

const ChallengeEditor = ({ initialTest, initialSolution, initialLanguage }) => {
    const [testContent, setTestContent] = useState(initialTest);
    const [solutionContent, setSolutionContent] = useState(initialSolution);
    const [language] = useState(initialLanguage);

    const handleTestChange = (value) => {
        setTestContent(value);
    };

    const handleSolutionChange = (value) => {
        setSolutionContent(value);
    };

    return (
        <div>
            <h2>Editor de Desafío</h2>
            <h3>Código de Prueba</h3>
            <CodeEditor
                value={testContent}
                onChange={handleTestChange}
                language={language} 
                theme="vs-dark" 
            />
            <h3>Solución</h3>
            <CodeEditor
                value={solutionContent}
                onChange={handleSolutionChange}
                language={language} 
                theme="vs-dark" 
            />
        </div>
    );
};

export default ChallengeEditor;
