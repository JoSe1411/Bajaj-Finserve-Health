const express = require('express');
const app = express();
const PORT = process.env.PORT || 3000;

// Basic middleware
app.use(express.json());

// Personal information
const userInfo = {
  fullName: process.env.USER_FULL_NAME || 'john_doe',
  birthDate: process.env.USER_BIRTH_DATE || '17091999',
  email: process.env.USER_EMAIL || 'john@xyz.com',
  rollNumber: process.env.USER_ROLL_NUMBER || 'ABCD123'
};

// Helper functions
function isNumeric(str) {
  return /^-?\d+$/.test(str) && !isNaN(parseInt(str, 10));
}

function isAlphabetic(str) {
  return /^[a-zA-Z]+$/.test(str);
}

function generateAlternatingCapsString(chars) {
  if (chars.length === 0) return '';
  const reversedChars = chars.reverse();
  return reversedChars
    .map((char, index) => {
      return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
    })
    .join('');
}

// POST /bfhl endpoint
app.post('/bfhl', (req, res) => {
  try {
    const { data } = req.body;
    
    // Check if data property exists
    if (!data) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input format'
      });
    }
    
    if (!Array.isArray(data)) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input format'
      });
    }

    if (data.length === 0) {
      return res.status(400).json({
        is_success: false,
        error: 'Data array cannot be empty'
      });
    }

    const result = {
      is_success: true,
      user_id: `${userInfo.fullName}_${userInfo.birthDate}`,
      email: userInfo.email,
      roll_number: userInfo.rollNumber,
      odd_numbers: [],
      even_numbers: [],
      alphabets: [],
      special_characters: [],
      sum: '0',
      concat_string: ''
    };

    const numbers = [];
    const alphabetChars = [];

    data.forEach(item => {
      if (isNumeric(item)) {
        const num = parseInt(item, 10);
        numbers.push(num);
        
        if (num % 2 === 0) {
          result.even_numbers.push(item);
        } else {
          result.odd_numbers.push(item);
        }
      } else if (isAlphabetic(item)) {
        result.alphabets.push(item.toUpperCase());
        alphabetChars.push(...item.split('').filter(char => /[a-zA-Z]/.test(char)));
      } else {
        result.special_characters.push(item);
      }
    });

    const sum = numbers.reduce((acc, num) => acc + num, 0);
    result.sum = sum.toString();
    result.concat_string = generateAlternatingCapsString(alphabetChars);

    res.json(result);
  } catch (error) {
    res.status(500).json({
      is_success: false,
      error: 'Internal server error'
    });
  }
});

// GET /bfhl endpoint
app.get('/bfhl', (req, res) => {
  res.json({
    operation_code: 1,
    message: 'BFHL API is running',
    timestamp: new Date().toISOString()
  });
});

// Root endpoint
app.get('/', (req, res) => {
  res.json({
    message: 'BFHL API Server',
    version: '1.0.0',
    endpoints: {
      post: '/bfhl - Process data array',
      get: '/bfhl - Health check'
    }
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Endpoint not found'
  });
});

app.listen(PORT, '0.0.0.0', () => {
  console.log(`Server running on port ${PORT}`);
});

module.exports = app;