# 🚀 Deployment Guide: API Testing Tools

This guide will help you deploy your API Testing Tools application with frontend on Netlify and backend on Railway/Render.

## 📋 Prerequisites

- Node.js 18+ installed locally
- Git repository with your code
- Netlify account (free)
- Railway or Render account (free tier available)
- MongoDB Atlas account (free tier available)

## 🎯 Deployment Strategy

### Frontend: Netlify (Static Hosting)
- ✅ Free hosting
- ✅ Global CDN
- ✅ Automatic HTTPS
- ✅ Custom domains
- ✅ Git-based deployments

### Backend: Railway/Render (Server Hosting)
- ✅ Free tier available
- ✅ Managed databases
- ✅ Automatic HTTPS
- ✅ Environment variables
- ✅ Git-based deployments

## 🌐 Frontend Deployment (Netlify)

### 1. Prepare Frontend for Production

```bash
# Navigate to frontend directory
cd frontend

# Install dependencies
npm install

# Test build locally
npm run build:export
```

### 2. Configure Environment Variables

Create `.env.production` in frontend directory:
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
NEXT_PUBLIC_APP_NAME=API Testing Tools
```

### 3. Deploy to Netlify

#### Option A: Drag & Drop (Easiest)
```bash
# Build the project
npm run build:export

# The 'out' folder is ready for deployment
# Upload the entire 'out' folder to Netlify
```

#### Option B: Git Integration (Recommended)
1. Push your code to GitHub/GitLab/Bitbucket
2. Connect your repository to Netlify
3. Configure build settings:
   - **Build command**: `npm run build:export`
   - **Publish directory**: `out`
4. Deploy!

### 4. Netlify Configuration

The `netlify.toml` file is already configured with:
- ✅ Proper build settings
- ✅ API redirects to your backend
- ✅ SPA routing
- ✅ Security headers
- ✅ CORS headers

## 🖥️ Backend Deployment (Railway)

### 1. Prepare Backend for Production

```bash
# Navigate to backend directory
cd backend

# Install dependencies
npm install

# Update package.json for production
```

### 2. Set Up MongoDB Atlas

1. Go to [MongoDB Atlas](https://cloud.mongodb.com)
2. Create a free cluster
3. Get connection string
4. Create database user

### 3. Deploy to Railway

#### Option A: GitHub Integration
1. Go to [Railway](https://railway.app)
2. Click "New Project" → "Deploy from GitHub repo"
3. Select your repository
4. Railway will detect Node.js project
5. Configure environment variables:
   ```
   NODE_ENV=production
   PORT=5000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/api-testing-tools
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=https://your-frontend-url.netlify.app
   ```

#### Option B: CLI Deployment
```bash
# Install Railway CLI
npm install -g @railway/cli

# Login
railway login

# Deploy
railway up
```

### 4. Railway Configuration

The `railway.json` file is already configured with:
- ✅ Proper build settings
- ✅ Restart policy
- ✅ Node.js environment

## 🖥️ Backend Deployment (Render Alternative)

### 1. Deploy to Render

1. Go to [Render](https://render.com)
2. Click "New" → "Web Service"
3. Connect your GitHub repository
4. Configure:
   - **Name**: api-testing-backend
   - **Environment**: Node
   - **Build Command**: `npm install`
   - **Start Command**: `npm start`
   - **Instance Type**: Free

5. Add Environment Variables:
   ```
   NODE_ENV=production
   PORT=10000
   MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/api-testing-tools
   JWT_SECRET=your-super-secret-jwt-key
   CORS_ORIGIN=https://your-frontend-url.netlify.app
   ```

## 🔗 Connecting Frontend and Backend

### 1. Update API URLs

After deploying backend, update frontend configuration:

**In `frontend/.env.production`:**
```env
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

**In `netlify.toml`:**
```toml
[[redirects]]
  from = "/api/*"
  to = "https://your-backend-url.railway.app/api/:splat"
  status = 200
  force = true
```

### 2. Update CORS Settings

Make sure backend CORS allows your Netlify domain:
```env
CORS_ORIGIN=https://your-project-name.netlify.app
```

## 🚀 Quick Deployment Steps

### 1. Deploy Backend First
```bash
# 1. Set up MongoDB Atlas
# 2. Deploy backend to Railway/Render
# 3. Note the backend URL
```

### 2. Deploy Frontend Second
```bash
# 1. Update frontend with backend URL
# 2. Deploy to Netlify
# 3. Test the connection
```

### 3. Test Everything
1. Visit your Netlify URL
2. Try to register/login
3. Test API functionality
4. Check browser console for errors

## 🛠️ Troubleshooting

### Common Issues

#### CORS Errors
```env
# In backend environment variables
CORS_ORIGIN=https://your-frontend-url.netlify.app
```

#### API Connection Failed
```env
# Check frontend environment variable
NEXT_PUBLIC_API_URL=https://your-backend-url.railway.app
```

#### Build Failures
```bash
# Clear Next.js cache
rm -rf .next
npm run build:export
```

#### MongoDB Connection
```bash
# Test connection string
mongosh "mongodb+srv://username:password@cluster.mongodb.net/api-testing-tools"
```

## 📱 Mobile App Support

The deployed application will work on:
- ✅ Desktop browsers
- ✅ Mobile browsers
- ✅ Tablets
- ✅ Progressive Web App (PWA)

## 🔒 Security Considerations

### Production Checklist
- [ ] Change default JWT secret
- [ ] Use HTTPS everywhere
- [ ] Set up proper CORS origins
- [ ] Enable MongoDB authentication
- [ ] Set up monitoring
- [ ] Configure rate limiting

## 📊 Monitoring

### Netlify
- Build logs
- Function logs
- Analytics
- Form submissions

### Railway/Render
- Application logs
- Metrics
- Error tracking
- Performance monitoring

## 💰 Cost Breakdown

### Free Tier Limits
- **Netlify**: 100GB bandwidth/month
- **Railway**: $5/month after free credits
- **Render**: Free tier with limited hours
- **MongoDB Atlas**: 512MB storage

### Scaling Costs
- **Additional bandwidth**: $0.30/GB (Netlify)
- **Extra compute**: $0.00025/minute (Railway)
- **Larger database**: Starts at $9/month (MongoDB)

## 🔄 CI/CD Pipeline

### GitHub Actions (Optional)
```yaml
# .github/workflows/deploy.yml
name: Deploy
on:
  push:
    branches: [main]
jobs:
  deploy-frontend:
    runs-on: ubuntu-latest
    steps:
      - uses: actions/checkout@v2
      - name: Setup Node
        uses: actions/setup-node@v2
        with:
          node-version: '18'
      - name: Install dependencies
        run: npm install
        working-directory: ./frontend
      - name: Build
        run: npm run build:export
        working-directory: ./frontend
      - name: Deploy to Netlify
        uses: netlify/actions/cli@master
        with:
          args: deploy --dir=frontend/out --prod
```

## 🎉 Success!

Once deployed:
1. **Frontend URL**: `https://your-project.netlify.app`
2. **Backend URL**: `https://your-backend.railway.app`
3. **API Documentation**: `https://your-backend.railway.app/api-docs`
4. **Health Check**: `https://your-backend.railway.app/api/health`

Your API Testing Tools application is now live and accessible to users worldwide! 🌍
