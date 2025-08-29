const express = require('express');
const cors = require('cors');
const helmet = require('helmet');
const rateLimit = require('express-rate-limit');
const Joi = require('joi');

const app = express();
const PORT = process.env.PORT || 3000;

// Security middleware
app.use(helmet());
app.use(cors());

// Rate limiting
const limiter = rateLimit({
  windowMs: 15 * 60 * 1000, // 15 minutes
  max: 100, // limit each IP to 100 requests per windowMs
  message: 'Too many requests from this IP, please try again later.'
});
app.use(limiter);

// Body parser middleware
app.use(express.json({ limit: '10mb' }));
app.use(express.urlencoded({ extended: true }));

// Input validation schema
const inputSchema = Joi.object({
  data: Joi.array().items(Joi.string()).required()
});

/**
 * Data processor class implementing the BFHL business logic
 */
class BFHLProcessor {
  constructor() {
    // Personal information from environment variables or defaults
    this.userInfo = {
      fullName: process.env.USER_FULL_NAME || 'john_doe',
      birthDate: process.env.USER_BIRTH_DATE || '17091999',
      email: process.env.USER_EMAIL || 'john@xyz.com',
      rollNumber: process.env.USER_ROLL_NUMBER || 'ABCD123'
    };
  }

  /**
   * Processes input data array according to BFHL specifications
   * @param {string[]} data - Array of strings to process
   * @returns {Object} Processed response object
   */
  processData(data) {
    try {
      const result = {
        is_success: true,
        user_id: `${this.userInfo.fullName}_${this.userInfo.birthDate}`,
        email: this.userInfo.email,
        roll_number: this.userInfo.rollNumber,
        odd_numbers: [],
        even_numbers: [],
        alphabets: [],
        special_characters: [],
        sum: '0',
        concat_string: ''
      };

      const numbers = [];
      const alphabetChars = [];

      // Process each element in the data array
      data.forEach(item => {
        if (this.isNumeric(item)) {
          const num = parseInt(item, 10);
          numbers.push(num);
          
          if (num % 2 === 0) {
            result.even_numbers.push(item);
          } else {
            result.odd_numbers.push(item);
          }
        } else if (this.isAlphabetic(item)) {
          result.alphabets.push(item.toUpperCase());
          // Extract individual characters for concatenation
          alphabetChars.push(...item.split('').filter(char => /[a-zA-Z]/.test(char)));
        } else {
          result.special_characters.push(item);
        }
      });

      // Calculate sum of numbers
      const sum = numbers.reduce((acc, num) => acc + num, 0);
      result.sum = sum.toString();

      // Generate concatenated string with alternating caps
      result.concat_string = this.generateAlternatingCapsString(alphabetChars);

      return result;
    } catch (error) {
      throw new Error(`Data processing failed: ${error.message}`);
    }
  }

  /**
   * Checks if a string represents a valid number
   * @param {string} str - String to check
   * @returns {boolean} True if string is numeric
   */
  isNumeric(str) {
    return /^-?\d+$/.test(str) && !isNaN(parseInt(str, 10));
  }

  /**
   * Checks if a string contains only alphabetic characters
   * @param {string} str - String to check
   * @returns {boolean} True if string is alphabetic
   */
  isAlphabetic(str) {
    return /^[a-zA-Z]+$/.test(str);
  }

  /**
   * Generates concatenated string with alternating capitalization in reverse order
   * @param {string[]} chars - Array of alphabetic characters
   * @returns {string} Processed concatenated string
   */
  generateAlternatingCapsString(chars) {
    if (chars.length === 0) return '';

    // Reverse the order of characters
    const reversedChars = chars.reverse();
    
    // Apply alternating capitalization (start with uppercase)
    return reversedChars
      .map((char, index) => {
        return index % 2 === 0 ? char.toUpperCase() : char.toLowerCase();
      })
      .join('');
  }
}

// Initialize processor
const processor = new BFHLProcessor();

/**
 * POST /bfhl - Main API endpoint for data processing
 */
app.post('/bfhl', async (req, res) => {
  try {
    // Validate input
    const { error, value } = inputSchema.validate(req.body);
    if (error) {
      return res.status(400).json({
        is_success: false,
        error: 'Invalid input format',
        details: error.details[0].message
      });
    }

    const { data } = value;

    // Validate data array is not empty
    if (!data || data.length === 0) {
      return res.status(400).json({
        is_success: false,
        error: 'Data array cannot be empty'
      });
    }

    // Process the data
    const result = processor.processData(data);

    // Return successful response
    res.status(200).json(result);

  } catch (error) {
    console.error('BFHL API Error:', error);
    
    res.status(500).json({
      is_success: false,
      error: 'Internal server error',
      message: process.env.NODE_ENV === 'development' ? error.message : 'Something went wrong'
    });
  }
});

/**
 * GET /bfhl - Health check endpoint
 */
app.get('/bfhl', (req, res) => {
  res.status(200).json({
    operation_code: 1,
    message: 'BFHL API is running',
    timestamp: new Date().toISOString()
  });
});

/**
 * GET / - Root endpoint
 */
app.get('/', (req, res) => {
  res.status(200).json({
    message: 'BFHL API Server',
    version: '1.0.0',
    endpoints: {
      post: '/bfhl - Process data array',
      get: '/bfhl - Health check'
    }
  });
});

// Global error handler
app.use((err, req, res, next) => {
  console.error('Unhandled Error:', err);
  res.status(500).json({
    is_success: false,
    error: 'Internal server error'
  });
});

// 404 handler
app.use('*', (req, res) => {
  res.status(404).json({
    is_success: false,
    error: 'Endpoint not found'
  });
});

// Start server
app.listen(PORT, () => {
  console.log(`🚀 BFHL API Server running on port ${PORT}`);
  console.log(`📍 Health check: http://localhost:${PORT}/bfhl`);
  console.log(`📮 POST endpoint: http://localhost:${PORT}/bfhl`);
});

module.exports = app;
