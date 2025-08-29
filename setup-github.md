# 🚀 GitHub Setup Guide

Follow these steps to push your BFHL API to GitHub:

## Step 1: Create GitHub Repository

### Option A: Via GitHub Website (Recommended)
1. Go to [github.com](https://github.com) and sign in
2. Click the "+" icon → "New repository"
3. Repository details:
   - **Name**: `bfhl-api` (or your preferred name)
   - **Description**: "BFHL Data Processing REST API - Production Ready"
   - **Visibility**: ✅ Public (required for submission)
   - **Initialize**: ❌ Don't initialize (we already have code)
4. Click "Create repository"
5. Copy the repository URL (e.g., `https://github.com/YOUR_USERNAME/bfhl-api.git`)

### Option B: Via GitHub CLI (if installed)
```bash
# Create repo directly from terminal
gh repo create bfhl-api --public --description "BFHL Data Processing REST API"
```

## Step 2: Connect Local Repository to GitHub

Replace `YOUR_USERNAME` with your actual GitHub username:

```bash
# Add GitHub remote
git remote add origin https://github.com/YOUR_USERNAME/bfhl-api.git

# Verify remote
git remote -v

# Push to GitHub
git branch -M main  # Rename master to main (optional but recommended)
git push -u origin main
```

## Step 3: Verify Upload

1. Visit your repository: `https://github.com/YOUR_USERNAME/bfhl-api`
2. Check that all files are present:
   - ✅ `server.js` - Main API code
   - ✅ `package.json` - Dependencies
   - ✅ `README.md` - Documentation
   - ✅ `__tests__/` - Test files
   - ✅ `vercel.json`, `railway.json`, `render.yaml` - Deployment configs
   - ✅ `LICENSE` - MIT license

## Step 4: Update README Links

After pushing, update the README.md file to replace placeholder URLs:

1. Edit README.md on GitHub or locally
2. Replace `YOUR_USERNAME` with your actual username in:
   - Clone URLs
   - GitHub Issues links
   - Repository references

## Step 5: Deploy & Submit

1. **Deploy** to your chosen platform (Vercel recommended):
   ```bash
   vercel --prod  # Follow prompts to connect GitHub repo
   ```

2. **Test** your deployed API:
   ```bash
   curl -X POST YOUR_DEPLOYED_URL/bfhl \
     -H "Content-Type: application/json" \
     -d '{"data": ["a", "1", "334", "4", "R", "$"]}'
   ```

3. **Submit** your API URL to: https://forms.office.com/r/ZeVpUYp3zV

## 🔧 Troubleshooting

### Authentication Issues
```bash
# If you have 2FA enabled, use personal access token
git remote set-url origin https://YOUR_USERNAME:YOUR_TOKEN@github.com/YOUR_USERNAME/bfhl-api.git
```

### Permission Denied
```bash
# Check if you're logged in
git config --global user.name "Your Name"
git config --global user.email "your.email@example.com"
```

### Branch Issues
```bash
# If you get branch errors
git branch -M main
git push -u origin main --force
```

## ✅ Success Checklist

- [ ] Repository created on GitHub
- [ ] Code pushed successfully
- [ ] README displays correctly
- [ ] All files are present
- [ ] Repository is public
- [ ] Tests are passing (check Actions tab if enabled)
- [ ] Ready for deployment

---

**Next**: Follow [DEPLOYMENT.md](DEPLOYMENT.md) for deployment instructions.
