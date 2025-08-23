import React, { useState } from 'react';
import axios from 'axios';
import ExamForm from './components/ExamForm';
import ExamResults from './components/ExamResults';
import './App.css';

function App() {
  const [examQuestions, setExamQuestions] = useState([]);
  const [examData, setExamData] = useState(null);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const handleGenerateExam = async (formData) => {
    setIsLoading(true);
    setError('');
    
    try {
      const response = await axios.post('/generate-exam', formData);
      setExamQuestions(response.data.questions);
      setExamData(formData);
    } catch (err) {
      console.error('Error generating exam:', err);
      setError(err.response?.data?.error || 'Failed to generate exam. Please try again.');
    } finally {
      setIsLoading(false);
    }
  };

  const handleClearResults = () => {
    setExamQuestions([]);
    setExamData(null);
    setError('');
  };

  return (
    <div className="App">
      <div className="container">
        <h1>AI Math Exam Generator</h1>
        
        {error && (
          <div className="error-message">
            <p>{error}</p>
            <button onClick={() => setError('')} className="close-error">×</button>
          </div>
        )}

        {examQuestions.length === 0 ? (
          <ExamForm 
            onGenerateExam={handleGenerateExam} 
            isLoading={isLoading} 
          />
        ) : (
          <ExamResults 
            questions={examQuestions}
            examData={examData}
            onClearResults={handleClearResults}
          />
        )}
        
        {isLoading && (
          <div className="loading">
            <p>Generating your math exam...</p>
            <div className="spinner"></div>
          </div>
        )}
      </div>
    </div>
  );
}

export default App;
