import React, { useState } from 'react';

const ExamForm = ({ onGenerateExam, isLoading }) => {
  const [formData, setFormData] = useState({
    topic: '',
    questionCount: 5,
    includeAnswers: false
  });

  const handleInputChange = (e) => {
    const { name, value, type, checked } = e.target;
    setFormData(prev => ({
      ...prev,
      [name]: type === 'checkbox' ? checked : value
    }));
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    if (formData.topic.trim()) {
      onGenerateExam({
        ...formData,
        questionCount: parseInt(formData.questionCount)
      });
    }
  };

  return (
    <div className="exam-form">
      <h2>AI Math Exam Generator</h2>
      <form onSubmit={handleSubmit}>
        <div className="form-group">
          <label htmlFor="topic">Topic:</label>
          <input
            type="text"
            id="topic"
            name="topic"
            value={formData.topic}
            onChange={handleInputChange}
            placeholder="Enter math topic (e.g., Addition, Subtraction, Multiplication)"
            required
            disabled={isLoading}
          />
        </div>

        <div className="form-group">
          <label htmlFor="questionCount">Number of Questions:</label>
          <select
            id="questionCount"
            name="questionCount"
            value={formData.questionCount}
            onChange={handleInputChange}
            disabled={isLoading}
          >
            <option value={5}>5 Questions</option>
            <option value={10}>10 Questions</option>
            <option value={15}>15 Questions</option>
            <option value={20}>20 Questions</option>
          </select>
        </div>

        <div className="form-group checkbox-group">
          <label>
            <input
              type="checkbox"
              name="includeAnswers"
              checked={formData.includeAnswers}
              onChange={handleInputChange}
              disabled={isLoading}
            />
            Include Answers
          </label>
        </div>

        <button 
          type="submit" 
          disabled={isLoading || !formData.topic.trim()}
          className="generate-btn"
        >
          {isLoading ? 'Generating...' : 'Generate Exam'}
        </button>
      </form>
    </div>
  );
};

export default ExamForm;