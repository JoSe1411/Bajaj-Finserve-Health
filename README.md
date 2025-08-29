# BFHL API - Data Processing REST Service

A robust, production-ready REST API that processes arrays of mixed data types and returns categorized results according to BFHL specifications.

## 🚀 Features

- **High Performance**: Optimized data processing with O(n) complexity
- **Security**: Rate limiting, CORS, Helmet security headers
- **Validation**: Comprehensive input validation with Joi
- **Error Handling**: Graceful error handling with detailed responses
- **Testing**: Complete test suite with Jest and Supertest
- **Multi-Platform Deployment**: Ready for Vercel, Railway, Render
- **Production Ready**: Logging, monitoring, and best practices

## 📋 API Specification

### Endpoint: `POST /bfhl`

Processes an array of mixed data types and returns categorized results.

#### Request Format
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

#### Response Format
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

#### Health Check: `GET /bfhl`
Returns API status and operation code.

## 🔧 Data Processing Logic

1. **Numbers**: Categorized into odd/even arrays (returned as strings)
2. **Alphabets**: Converted to uppercase
3. **Special Characters**: All non-alphanumeric characters
4. **Sum**: Total of all numeric values (returned as string)
5. **Concatenation**: Alphabetic characters in reverse order with alternating capitalization

### Concatenation Algorithm
- Extract all alphabetic characters from all elements
- Reverse the character order
- Apply alternating capitalization (starting with uppercase)

## 🛠️ Installation & Setup

### Prerequisites
- Node.js 16+ 
- npm or yarn

### Local Development
```bash
# Clone repository
git clone <your-repo-url>
cd bfhl-api

# Install dependencies
npm install

# Copy environment file
cp .env.example .env

# Update .env with your personal information
# USER_FULL_NAME=your_name_here
# USER_BIRTH_DATE=ddmmyyyy
# USER_EMAIL=your@email.com
# USER_ROLL_NUMBER=YOUR123

# Run development server
npm run dev

# Run tests
npm test
```

## 🌐 Deployment Options

### Vercel
```bash
# Install Vercel CLI
npm i -g vercel

# Deploy
vercel --prod
```

### Railway
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login and deploy
railway login
railway deploy
```

### Render
1. Connect your GitHub repository
2. Set build command: `npm install`
3. Set start command: `npm start`
4. Deploy

## 📊 API Examples

### Example A
**Request:**
```json
{
  "data": ["a", "1", "334", "4", "R", "$"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["1"],
  "even_numbers": ["334", "4"],
  "alphabets": ["A", "R"],
  "special_characters": ["$"],
  "sum": "339",
  "concat_string": "Ra"
}
```

### Example B
**Request:**
```json
{
  "data": ["2", "a", "y", "4", "&", "-", "*", "5", "92", "b"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": ["5"],
  "even_numbers": ["2", "4", "92"],
  "alphabets": ["A", "Y", "B"],
  "special_characters": ["&", "-", "*"],
  "sum": "103",
  "concat_string": "ByA"
}
```

### Example C
**Request:**
```json
{
  "data": ["A", "ABcD", "DOE"]
}
```

**Response:**
```json
{
  "is_success": true,
  "user_id": "john_doe_17091999",
  "email": "john@xyz.com",
  "roll_number": "ABCD123",
  "odd_numbers": [],
  "even_numbers": [],
  "alphabets": ["A", "ABCD", "DOE"],
  "special_characters": [],
  "sum": "0",
  "concat_string": "EoDdCbAa"
}
```

## 🔒 Security Features

- **Rate Limiting**: 100 requests per 15 minutes per IP
- **CORS**: Configurable cross-origin resource sharing
- **Helmet**: Security headers protection
- **Input Validation**: Strict schema validation with Joi
- **Error Sanitization**: Prevents information leakage

## 🧪 Testing

Comprehensive test suite covering:
- All example scenarios
- Edge cases (negative numbers, empty arrays)
- Input validation
- Error handling
- Health checks

```bash
# Run all tests
npm test

# Run with coverage
npm test -- --coverage
```

## 📝 Environment Variables

| Variable | Description | Example |
|----------|-------------|---------|
| `PORT` | Server port | `3000` |
| `NODE_ENV` | Environment | `production` |
| `USER_FULL_NAME` | Your full name (lowercase) | `john_doe` |
| `USER_BIRTH_DATE` | Birth date (ddmmyyyy) | `17091999` |
| `USER_EMAIL` | Your email | `john@xyz.com` |
| `USER_ROLL_NUMBER` | College roll number | `ABCD123` |

## 🏗️ Architecture

```
├── server.js              # Main server and API logic
├── __tests__/
│   └── api.test.js        # Comprehensive test suite
├── package.json           # Dependencies and scripts
├── vercel.json           # Vercel deployment config
├── railway.json          # Railway deployment config
├── render.yaml           # Render deployment config
├── .env.example          # Environment variables template
└── README.md             # This file
```

## 🔍 Performance Considerations

- **Time Complexity**: O(n) for data processing
- **Space Complexity**: O(n) for result arrays
- **Memory Management**: Efficient string processing
- **Rate Limiting**: Prevents abuse and ensures stability

## 🚨 Error Handling

The API handles various error scenarios:

- **400**: Invalid input format or empty data array
- **429**: Rate limit exceeded
- **500**: Internal server errors
- **404**: Endpoint not found

All errors return structured JSON responses with `is_success: false`.

## 🤝 Contributing

1. Fork the repository
2. Create a feature branch
3. Make your changes
4. Add/update tests
5. Submit a pull request

## 📄 License

MIT License - see LICENSE file for details.

---

**Note**: Update the personal information in the `.env` file or environment variables before deployment to ensure the API returns your correct details.
