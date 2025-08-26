import React, { useState } from 'react';

const ExamResults = ({ questions, examData, onClearResults }) => {
  const [showAnswers, setShowAnswers] = useState(examData?.includeAnswers || false);

  const copyToClipboard = () => {
    let content = `Math Exam - ${examData.topic}\n`;
    content += `Number of Questions: ${examData.questionCount}\n\n`;
    
    questions.forEach((q, index) => {
      content += `Question ${index + 1}: ${q.question}\n`;
      if (showAnswers && q.answer) {
        content += `Answer: ${q.answer}\n`;
      }
      content += '\n';
    });

    navigator.clipboard.writeText(content).then(() => {
      alert('Exam copied to clipboard!');
    }).catch(() => {
      alert('Failed to copy to clipboard');
    });
  };

  if (!questions || questions.length === 0) {
    return null;
  }

  return (
    <div className="exam-results">
      <div className="results-header">
        <h3>Generated Math Exam - {examData.topic}</h3>
        <div className="action-buttons">
          <button onClick={() => setShowAnswers(!showAnswers)} className="toggle-btn">
            {showAnswers ? 'Hide Answers' : 'Show Answers'}
          </button>
          <button onClick={copyToClipboard} className="copy-btn">
            Copy to Clipboard
          </button>
          <button onClick={onClearResults} className="clear-btn">
            Generate New Exam
          </button>
        </div>
      </div>

      <div className="questions-list">
        {questions.map((question, index) => (
          <div key={index} className="question-item">
            <div className="question">
              <strong>Question {index + 1}:</strong> {question.question}
            </div>
            {showAnswers && question.answer && (
              <div className="answer">
                <strong>Answer:</strong> {question.answer}
              </div>
            )}
          </div>
        ))}
      </div>

      <div className="exam-info">
        <p>Total Questions: {questions.length}</p>
        <p>Topic: {examData.topic}</p>
        <p>Answers Included: {examData.includeAnswers ? 'Yes' : 'No'}</p>
      </div>
    </div>
  );
};

export default ExamResults;