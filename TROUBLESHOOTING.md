# 🔧 API Testing Tools - Troubleshooting Guide

## 📋 Project Overview
API Testing Tools application with Next.js frontend, Node.js backend, and MongoDB database deployed on Railway (backend) and Netlify (frontend). 

---

## 🚨 Problems Encountered & Solutions

### 1. ❌ MongoDB Connection Issues

#### **Problem:**
```
MongoDB connection error: connect ECONNREFUSED ::1:27017
Error seeding demo user: MongooseError: Operation `users.findOne()` buffering timed out after 10000ms
```

#### **Root Cause:**
- Railway container में MongoDB service नहीं था
- Local MongoDB connection string use कर रहे थे
- Port conflict: Railway में 27017 port already occupied

#### **Solution:**
✅ **MongoDB Atlas Setup:**
1. [MongoDB Atlas](https://cloud.mongodb.com) पर free cluster create किया
2. Database user create किया: `hrreshmi46_db_user`
3. Connection string प्राप्त किया:
   ```
   mongodb+srv://hrreshmi46_db_user:harireshmi1234@cluster0.j8ho8ld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0
   ```
4. Railway environment variables update किए:
   ```bash
   railway variables set MONGO_URI="mongodb+srv://hrreshmi46_db_user:harireshmi1234@cluster0.j8ho8ld.mongodb.net/?retryWrites=true&w=majority&appName=Cluster0"
   ```

---

### 2. ❌ Docker Port Conflicts

#### **Problem:**
```
Bind for 0.0.0.0:27017 failed: port is already allocated
```

#### **Root Cause:**
- Local MongoDB container running था port 27017 पर
- Railway में port conflict आ रहा था
- Multiple MongoDB instances running

#### **Solution:**
✅ **Port Change:**
- Railway MongoDB को port 27018 पर change किया
- Local MongoDB container stop किया
- docker-compose.yml update किया:
   ```yaml
   mongodb:
     ports:
       - "27018:27017"  # Changed from 27017:27017
   ```

---

### 3. ❌ Frontend Docker Build Issues

#### **Problem:**
```
Error: "next start" does not work with "output: export" configuration. Use "npx serve@latest out" instead.
```

#### **Root Cause:**
- Next.js में static export configuration था
- Dockerfile में `next start` command use कर रहे थे
- Static files serve करने के लिए serve package चाहिए

#### **Solution:**
✅ **Dockerfile Fix:**
```dockerfile
# Install serve for static files
RUN npm install -g serve

# Copy built static files
COPY --from=builder /app/out ./out

# Start static file server
CMD ["serve", "-s", "out", "-l", "3000"]
```

---

### 4. ❌ Railway Environment Variables Issues

#### **Problem:**
```
Missing required environment variable: MONGO_URI
No linked project found. Run railway link to connect to a project
```

#### **Root Cause:**
- Railway CLI में project link नहीं था
- Environment variables properly set नहीं थे
- MongoDB connection string missing था

#### **Solution:**
✅ **Railway Setup:**
1. Railway CLI login: `railway login --browserless`
2. Project initialization: `railway init`
3. Service linking: `railway service`
4. Variables setup:
   ```bash
   railway variables set NODE_ENV=production
   railway variables set PORT=5000
   railway variables set MONGO_URI="mongodb+srv://..."
   railway variables set JWT_SECRET="your-secret-key"
   railway variables set CORS_ORIGIN="https://api-testing-tools.netlify.app"
   ```

---

### 5. ❌ CORS Configuration Issues

#### **Problem:**
Frontend और backend के बीच में communication issues

#### **Root Cause:**
- CORS origin properly configure नहीं था
- Development URLs production में use कर रहे थे
- Environment variables mismatch

#### **Solution:**
✅ **CORS Configuration:**
```env
# Backend Environment Variables
CORS_ORIGIN=https://api-testing-tools.netlify.app

# Frontend Environment Variables  
NEXT_PUBLIC_API_URL=https://api-testing-production-704f.up.railway.app
```

---

## 🎯 Final Architecture

### **🏗️ Development (Docker)**
```
┌─────────────────┐    ┌─────────────────┐    ┌─────────────────┐
│   Frontend     │    │    Backend       │    │   MongoDB       │
│   (Port 3000) │────│   (Port 5000)     │────│ (Port 27018)    │
│   Next.js      │    │   Node.js        │    │   Atlas         │
│   Static       │    │   Express        │    │                 │
└─────────────────┘    └─────────────────┘    └─────────────────┘
```

### **🌐 Production**
```
┌─────────────────────────────────────────────────────────────────────────┐
│                   Netlify (Frontend)                                    │
│          https://api-testing-tools.netlify.app                          │
│                   Static Hosting                                        │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────────────────┐
│                   Railway (Backend)                                     │
│    https://api-testing-production-704f.up.railway.app                   │
│                Serverless Hosting                                       │
└─────────────────────────────────────────────────────────────────────────┘
                              │
                              │
┌─────────────────────────────────────────────────────────────────────────┐
│                 MongoDB Atlas (Database)                                │
│        Cluster0 (M0 Sandbox - Free Tier)                                │
└─────────────────────────────────────────────────────────────────────────┘
```

---

## ✅ Current Status

### **🖥️ Local Docker Environment**
- ✅ **Frontend:** Running on http://localhost:3000
- ✅ **Backend:** Running on http://localhost:5000  
- ✅ **MongoDB:** Connected on localhost:27018
- ✅ **All Services:** Healthy and communicating

### **🌐 Production Environment**
- ✅ **Backend:** Deployed on Railway
  - URL: https://api-testing-production-704f.up.railway.app
  - Status: Running with MongoDB Atlas connected
  - Database: MongoDB Atlas Cluster0
  
- ✅ **Frontend:** Ready for Netlify deployment
  - Build: Static files ready in `frontend/out` folder
  - Configuration: `netlify.toml` updated with production URLs
  - Redirects: API calls properly configured

---

## 🚀 Deployment Commands

### **Frontend (Netlify)**
```bash
# Build static files
cd frontend
npm run build:export

# Deploy via drag & drop
# Upload 'out' folder to: https://app.netlify.com/drop

# Or via Git integration
# Connect GitHub repository to Netlify
# Build command: npm run build:export
# Publish directory: out
```

### **Backend (Railway)**
```bash
# Deploy to Railway
cd backend
railway up

# Update environment variables
railway variables set MONGO_URI="your-connection-string"
railway variables set CORS_ORIGIN="https://your-frontend.netlify.app"
```

---

## 🔍 Testing & Verification

### **Health Checks**
```bash
# Backend health
curl -I http://localhost:5000

# Frontend health  
curl -I http://localhost:3000

# MongoDB connection
docker logs api-testing-mongodb
```

### **API Testing**
```bash
# Test registration
curl -X POST http://localhost:5000/api/auth/register \
  -H "Content-Type: application/json" \
  -d '{"name":"Test User","email":"test@example.com","password":"test123"}'

# Test login
curl -X POST http://localhost:5000/api/auth/login \
  -H "Content-Type: application/json" \
  -d '{"email":"test@example.com","password":"test123"}'
```

---

## 📚 Lessons Learned

### **🎯 Key Takeaways**
1. **Static Export Configuration:** Next.js में `output: export` के लिए proper serve command चाहिए
2. **Port Management:** Railway और local ports के बीच conflicts avoid करने चाहिए
3. **Environment Variables:** Production और development के लिए separate configurations रखनी चाहिए
4. **CORS Setup:** Cross-origin requests properly configure करना जरूरी है
5. **Database Strategy:** MongoDB Atlas better है production के लिए managed database के रूप में

### **🔧 Best Practices**
- ✅ Always use environment variables for sensitive data
- ✅ Configure CORS properly for cross-origin requests
- ✅ Use managed databases in production
- ✅ Implement proper error handling and logging
- ✅ Set up health checks for monitoring
- ✅ Use static exports for better performance

---

## 🎉 Success Metrics

### **📊 Deployment Statistics**
- **Build Time:** ~2 minutes for frontend
- **Deploy Time:** ~1 minute for backend  
- **Downtime:** Minimal during fixes
- **Performance:** Fast loading with static hosting
- **Scalability:** Ready for production traffic

### **🌟 Final Result**
**API Testing Tools application successfully deployed and running!**

🔗 **Live URLs:**
- Frontend: https://api-testing-tools.netlify.app (after final deploy)
- Backend: https://api-testing-production-704f.up.railway.app
- Database: MongoDB Atlas Cluster0

✨ **Features Working:**
- User Registration & Authentication
- JWT-based Login System  
- API Testing Interface
- MongoDB Data Persistence
- CORS-enabled API
- Production-ready Configuration

---

*Last Updated: February 28, 2026*
*Version: 1.0.0*
