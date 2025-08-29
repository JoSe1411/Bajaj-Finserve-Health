# 🚀 Deployment Guide

## Quick Start Commands

```bash
# Install dependencies
npm install

# Test locally
npm run dev

# Run tests
npm test

# Test API manually
node test-api.js http://localhost:3000
```

## Platform-Specific Deployment

### 1. Vercel (Recommended for ease of use)

```bash
# Install Vercel CLI
npm i -g vercel

# Login to Vercel
vercel login

# Deploy
vercel --prod

# Set environment variables (optional)
vercel env add USER_FULL_NAME
vercel env add USER_BIRTH_DATE
vercel env add USER_EMAIL  
vercel env add USER_ROLL_NUMBER
```

**Environment Variables in Vercel Dashboard:**
- Go to Project Settings → Environment Variables
- Add your personal information variables

### 2. Railway

```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Initialize and deploy
railway add
railway up

# Set environment variables
railway variables set USER_FULL_NAME=your_name_here
railway variables set USER_BIRTH_DATE=ddmmyyyy
railway variables set USER_EMAIL=your@email.com
railway variables set USER_ROLL_NUMBER=YOUR123
```

### 3. Render

1. **Connect Repository:**
   - Go to [Render Dashboard](https://dashboard.render.com/)
   - Click "New" → "Web Service"
   - Connect your GitHub repository

2. **Configure Service:**
   - Build Command: `npm install`
   - Start Command: `npm start`
   - Environment: `Node`

3. **Environment Variables:**
   - `NODE_ENV` = `production`
   - `USER_FULL_NAME` = `your_name_here`
   - `USER_BIRTH_DATE` = `ddmmyyyy`
   - `USER_EMAIL` = `your@email.com`
   - `USER_ROLL_NUMBER` = `YOUR123`

4. **Deploy:**
   - Click "Create Web Service"

### 4. Heroku

```bash
# Install Heroku CLI
# Create Heroku app
heroku create your-app-name

# Set environment variables
heroku config:set USER_FULL_NAME=your_name_here
heroku config:set USER_BIRTH_DATE=ddmmyyyy
heroku config:set USER_EMAIL=your@email.com
heroku config:set USER_ROLL_NUMBER=YOUR123

# Deploy
git push heroku main
```

## Testing Deployed API

Replace `YOUR_DEPLOYED_URL` with your actual deployment URL:

```bash
# Test with curl
curl -X POST YOUR_DEPLOYED_URL/bfhl \
  -H "Content-Type: application/json" \
  -d '{"data": ["a", "1", "334", "4", "R", "$"]}'

# Test with the test script
node test-api.js YOUR_DEPLOYED_URL

# Health check
curl YOUR_DEPLOYED_URL/bfhl
```

## Submission Checklist

- [ ] API deployed and accessible
- [ ] `/bfhl` endpoint responds to POST requests
- [ ] Personal information updated in environment variables
- [ ] Health check endpoint working (`GET /bfhl`)
- [ ] All test cases passing
- [ ] Repository pushed to GitHub (public)
- [ ] API URL submitted to form: https://forms.office.com/r/ZeVpUYp3zV

## Common Issues

### 1. Environment Variables Not Set
**Symptom:** API returns default values (john_doe_17091999)
**Solution:** Set environment variables on your deployment platform

### 2. CORS Issues
**Symptom:** Browser requests blocked
**Solution:** API already includes CORS middleware, check deployment logs

### 3. Memory/Timeout Issues
**Symptom:** 500 errors or timeouts
**Solution:** Ensure platform has sufficient resources, API is optimized for performance

### 4. Port Binding Issues
**Symptom:** Application not starting
**Solution:** API uses `process.env.PORT || 3000` which works on all platforms

## Monitoring

After deployment, monitor:
- API response times
- Error rates
- Health check status
- Rate limiting metrics

Most platforms provide built-in monitoring dashboards.

## Security Notes

- API includes rate limiting (100 req/15min per IP)
- Security headers via Helmet
- Input validation with Joi
- Error sanitization
- No sensitive data exposure

## Support

If you encounter issues:
1. Check deployment platform logs
2. Verify environment variables
3. Test locally first
4. Check network connectivity
5. Review API documentation in README.md
