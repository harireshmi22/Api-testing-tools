#!/bin/bash

# 🚀 API Testing Tools Deployment Script
# This script helps deploy frontend to Netlify and backend to Railway

set -e

echo "🚀 Starting deployment of API Testing Tools..."

# Colors for output
RED='\033[0;31m'
GREEN='\033[0;32m'
YELLOW='\033[1;33m'
BLUE='\033[0;34m'
NC='\033[0m' # No Color

# Function to print colored output
print_status() {
    echo -e "${GREEN}[INFO]${NC} $1"
}

print_warning() {
    echo -e "${YELLOW}[WARNING]${NC} $1"
}

print_error() {
    echo -e "${RED}[ERROR]${NC} $1"
}

print_step() {
    echo -e "${BLUE}[STEP]${NC} $1"
}

# Check if required tools are installed
check_dependencies() {
    print_step "Checking dependencies..."
    
    if ! command -v node &> /dev/null; then
        print_error "Node.js is not installed. Please install Node.js first."
        exit 1
    fi
    
    if ! command -v npm &> /dev/null; then
        print_error "npm is not installed. Please install npm first."
        exit 1
    fi
    
    print_status "Dependencies check passed ✓"
}

# Build frontend for production
build_frontend() {
    print_step "Building frontend for production..."
    cd frontend
    
    # Install dependencies
    npm install
    
    # Build for static export
    npm run build:export
    
    if [ $? -eq 0 ]; then
        print_status "Frontend build successful ✓"
        print_status "Static files are ready in 'out' directory"
    else
        print_error "Frontend build failed ✗"
        exit 1
    fi
    
    cd ..
}

# Build backend for production
build_backend() {
    print_step "Building backend for production..."
    cd backend
    
    # Install dependencies
    npm install --production
    
    if [ $? -eq 0 ]; then
        print_status "Backend build successful ✓"
    else
        print_error "Backend build failed ✗"
        exit 1
    fi
    
    cd ..
}

# Deploy frontend to Netlify
deploy_frontend_netlify() {
    print_step "Preparing frontend for Netlify deployment..."
    
    echo ""
    print_status "Frontend Deployment Options:"
    echo "1. Drag & Drop (Easiest)"
    echo "2. Git Integration (Recommended)"
    echo ""
    
    read -p "Choose deployment method (1 or 2): " choice
    
    case $choice in
        1)
            print_status "Open https://app.netlify.com/drop"
            print_status "Upload the 'frontend/out' folder"
            print_warning "Make sure to update netlify.toml with your backend URL"
            ;;
        2)
            print_status "Push your code to GitHub first"
            print_status "Then connect your repository to Netlify"
            print_status "Configure build settings:"
            echo "  Build command: npm run build:export"
            echo "  Publish directory: out"
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
}

# Deploy backend to Railway
deploy_backend_railway() {
    print_step "Preparing backend for Railway deployment..."
    
    echo ""
    print_status "Backend Deployment Options:"
    echo "1. Railway (Recommended)"
    echo "2. Render (Alternative)"
    echo ""
    
    read -p "Choose deployment platform (1 or 2): " choice
    
    case $choice in
        1)
            print_status "Open https://railway.app/new"
            print_status "Choose 'Deploy from GitHub repo'"
            print_status "Select your repository"
            print_warning "Configure these environment variables:"
            echo "  NODE_ENV=production"
            echo "  PORT=5000"
            echo "  MONGO_URI=mongodb+srv://username:password@cluster.mongodb.net/api-testing-tools"
            echo "  JWT_SECRET=your-super-secret-jwt-key"
            echo "  CORS_ORIGIN=https://your-frontend-url.netlify.app"
            ;;
        2)
            print_status "Open https://render.com"
            print_status "Click 'New' → 'Web Service'"
            print_status "Connect your GitHub repository"
            print_warning "Configure these settings:"
            echo "  Name: api-testing-backend"
            echo "  Environment: Node"
            echo "  Build Command: npm install"
            echo "  Start Command: npm start"
            echo "  Instance Type: Free"
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
}

# Setup MongoDB Atlas
setup_mongodb() {
    print_step "MongoDB Atlas Setup"
    print_status "1. Go to https://cloud.mongodb.com"
    print_status "2. Create a free cluster (M0 Sandbox)"
    print_status "3. Create a database user"
    print_status "4. Get connection string"
    print_status "5. Replace in your backend environment variables"
    print_warning "Connection string format:"
    echo "  mongodb+srv://username:password@cluster.mongodb.net/api-testing-tools"
}

# Main deployment flow
main() {
    echo ""
    print_status "🎯 API Testing Tools Deployment Script"
    print_status "This will help you deploy frontend to Netlify and backend to Railway"
    echo ""
    
    check_dependencies
    
    echo ""
    print_status "Choose what to build:"
    echo "1. Frontend only"
    echo "2. Backend only"
    echo "3. Both frontend and backend"
    echo "4. Setup MongoDB Atlas only"
    echo ""
    
    read -p "Enter your choice (1-4): " choice
    
    case $choice in
        1)
            build_frontend
            deploy_frontend_netlify
            ;;
        2)
            build_backend
            deploy_backend_railway
            ;;
        3)
            build_frontend
            build_backend
            deploy_frontend_netlify
            deploy_backend_railway
            ;;
        4)
            setup_mongodb
            ;;
        *)
            print_error "Invalid choice"
            exit 1
            ;;
    esac
    
    echo ""
    print_status "🎉 Deployment preparation complete!"
    print_status "Follow the platform-specific instructions above to complete deployment"
    print_status "Don't forget to:"
    echo "  ✅ Update frontend API URL with backend URL"
    echo "  ✅ Configure CORS origins"
    echo "  ✅ Test the live application"
}

# Run main function
main "$@"
