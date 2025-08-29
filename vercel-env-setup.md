# 🔧 Vercel Environment Variables Setup

## Required Environment Variables for BFHL API

Add these environment variables in your Vercel dashboard:

### 1. USER_FULL_NAME
- **Value**: Your full name in lowercase with underscore
- **Example**: `john_doe`, `jane_smith`, `jose_sen`
- **Format**: firstname_lastname (all lowercase)

### 2. USER_BIRTH_DATE
- **Value**: Your birth date in ddmmyyyy format
- **Example**: `17091999`, `25121995`, `14112003`
- **Format**: ddmmyyyy (day, month, year)

### 3. USER_EMAIL
- **Value**: Your email address
- **Example**: `john@xyz.com`, `student@university.edu`
- **Format**: valid email address

### 4. USER_ROLL_NUMBER
- **Value**: Your college roll number
- **Example**: `ABCD123`, `CS2021001`, `ECE19B001`
- **Format**: as provided by your institution

## How to Add in Vercel Dashboard

1. **Navigate**: Go to [vercel.com/dashboard](https://vercel.com/dashboard)
2. **Select Project**: Click on your "bajaj-finserv-health" project
3. **Settings**: Click the "Settings" tab
4. **Environment Variables**: Click "Environment Variables" in sidebar
5. **Add Variables**: Click "Add" and enter each variable
6. **Deploy**: Set environment for "Production, Preview, and Development"
7. **Redeploy**: Go to Deployments → latest deployment → "..." → "Redeploy"

## Verification

After redeployment, your API response will show:
```json
{
  "is_success": true,
  "user_id": "your_name_ddmmyyyy",
  "email": "your@email.com", 
  "roll_number": "YOUR123",
  // ... other fields
}
```

## Alternative: Local Environment File

If testing locally, update `.env` file:
```bash
USER_FULL_NAME=your_name_here
USER_BIRTH_DATE=ddmmyyyy
USER_EMAIL=your@email.com
USER_ROLL_NUMBER=YOUR123
```

## Common Issues

- **Case Sensitive**: Use exact variable names (USER_FULL_NAME, not user_full_name)
- **No Spaces**: Use underscores in names (john_doe, not john doe)
- **Date Format**: Must be ddmmyyyy (not dd/mm/yyyy or other formats)
- **Redeploy Required**: Changes only take effect after redeployment
