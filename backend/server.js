const express = require('express');
const cors = require('cors');
const { GoogleGenerativeAI } = require('@google/generative-ai');
require('dotenv').config();

const app = express();
const PORT = process.env.PORT || 3001;

// Initialize Gemini AI
const genAI = new GoogleGenerativeAI(process.env.GEMINI_API_KEY);

// Middleware
app.use(cors());
app.use(express.json());

// Health check endpoint
app.get('/', (req, res) => {
  res.json({ message: 'AI Exam Paper Generator API is running!' });
});

// Generate exam endpoint
app.post('/generate-exam', async (req, res) => {
  try {
    const { topic, questionCount, includeAnswers } = req.body;

    // Input validation
    if (!topic || typeof topic !== 'string' || topic.trim().length === 0) {
      return res.status(400).json({ 
        error: 'Topic is required and must be a non-empty string' 
      });
    }

    if (!questionCount || typeof questionCount !== 'number' || questionCount < 1 || questionCount > 50) {
      return res.status(400).json({ 
        error: 'Question count must be a number between 1 and 50' 
      });
    }

    // Get the generative model
    const model = genAI.getGenerativeModel({ model: "gemini-2.5-flash" });

    // Create better prompt for education
    let prompt = `You are an experienced elementary math teacher creating an exam for grades 2-5 students.\n\n`;
    prompt += `Create ${questionCount} distinct math questions about "${topic}". \n\n`;
    prompt += `Requirements:\n`;
    prompt += `- Make questions age-appropriate and engaging\n`;
    prompt += `- Use real-world scenarios (food, toys, animals, etc.)\n`;
    prompt += `- Vary question difficulty gradually\n`;
    prompt += `- Include different problem types when possible\n`;
    prompt += `- Keep language simple and clear\n\n`;
    
    if (includeAnswers) {
      prompt += `For each question, provide a clear, concise answer.\n`;
      prompt += `For calculation problems, show the final numerical answer.\n\n`;
    }
    
    prompt += `Format exactly like this:\n`;
    prompt += `Question 1: [Write an engaging word problem here]\n`;
    if (includeAnswers) {
      prompt += `Answer: [Clear, specific answer]\n`;
    }
    prompt += `\nQuestion 2: [Next question]\n`;
    if (includeAnswers) {
      prompt += `Answer: [Clear, specific answer]\n`;
    }
    prompt += `\nContinue for all ${questionCount} questions.\n\n`;
    prompt += `Topic focus: ${topic}`;

    // Generate content
    const result = await model.generateContent(prompt);
    const response = await result.response;
    const text = response.text();

    // Parse the response into structured format
    const questions = parseExamResponse(text, includeAnswers);

    res.json({ questions });

  } catch (error) {
    console.error('Error generating exam:', error);
    
    if (error.message.includes('API key')) {
      return res.status(401).json({ 
        error: 'API key is invalid or missing. Please check your Gemini API configuration.' 
      });
    }
    
    res.status(500).json({ 
      error: 'Failed to generate exam. Please try again.' 
    });
  }
});

// Helper function to parse AI response
function parseExamResponse(text, includeAnswers) {
  const questions = [];
  const lines = text.split('\n').filter(line => line.trim());
  
  let currentQuestion = null;
  
  for (const line of lines) {
    const trimmedLine = line.trim();
    
    // Match question pattern
    const questionMatch = trimmedLine.match(/^Question\s+\d+:\s*(.+)/i);
    if (questionMatch) {
      // Save previous question if exists
      if (currentQuestion) {
        questions.push(currentQuestion);
      }
      
      // Start new question
      currentQuestion = {
        question: questionMatch[1].trim(),
        answer: includeAnswers ? '' : undefined
      };
    }
    
    // Match answer pattern
    if (includeAnswers && currentQuestion) {
      const answerMatch = trimmedLine.match(/^Answer:\s*(.+)/i);
      if (answerMatch) {
        currentQuestion.answer = answerMatch[1].trim();
      }
    }
  }
  
  // Add the last question
  if (currentQuestion) {
    questions.push(currentQuestion);
  }
  
  return questions;
}

// Error handling middleware
app.use((error, req, res, next) => {
  console.error('Server error:', error);
  res.status(500).json({ error: 'Internal server error' });
});

// Start server
app.listen(PORT, () => {
  console.log(`Server is running on port ${PORT}`);
  console.log(`API available at http://localhost:${PORT}`);
});

module.exports = app;