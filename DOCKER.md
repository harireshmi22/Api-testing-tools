# Docker Setup for API Testing Tools

This document provides comprehensive instructions for running the API Testing Tools application using Docker and Docker Compose.

## 🐳 Prerequisites

- Docker Desktop (Windows/Mac) or Docker Engine (Linux)
- Docker Compose (included with Docker Desktop)
- At least 4GB RAM available for Docker

## 🚀 Quick Start

### 1. Clone and Navigate
```bash
git clone <repository-url>
cd api-testing-tools-3
```

### 2. Environment Configuration
```bash
# Copy the environment file template
cp .env.example .env

# Edit the .env file with your preferences
# Important: Change JWT_SECRET in production
```

### 3. Start All Services
```bash
# Start all services (MongoDB, Backend, Frontend)
docker-compose up -d

# View logs
docker-compose logs -f
```

### 4. Access the Application
- **Frontend**: http://localhost:3000
- **Backend API**: http://localhost:5000
- **MongoDB**: mongodb://localhost:27017

## 📋 Services Overview

### MongoDB Database
- **Container**: `api-testing-mongodb`
- **Image**: `mongo:7.0`
- **Port**: `27017:27017`
- **Credentials**: 
  - Username: `admin`
  - Password: `password123`
  - Database: `api-testing-tools`

### Backend Service
- **Container**: `api-testing-backend`
- **Port**: `5000:5000`
- **Environment**: Production
- **Health Check**: `/api/health`

### Frontend Service
- **Container**: `api-testing-frontend`
- **Port**: `3000:3000`
- **Environment**: Production

### Nginx Reverse Proxy (Optional)
- **Container**: `api-testing-nginx`
- **Ports**: `80:80`, `443:443`
- **Profile**: `production`

## 🛠️ Docker Compose Commands

### Basic Operations
```bash
# Start all services
docker-compose up -d

# Start specific service
docker-compose up -d mongodb

# Stop all services
docker-compose down

# Stop and remove volumes
docker-compose down -v

# Rebuild and start
docker-compose up --build -d

# View logs
docker-compose logs -f
docker-compose logs -f backend
```

### Development Mode
```bash
# Start with development configuration
docker-compose -f docker-compose.yml -f docker-compose.dev.yml up -d

# Watch logs for development
docker-compose -f docker-compose.yml -f docker-compose.dev.yml logs -f
```

### Production Mode
```bash
# Start with nginx reverse proxy
docker-compose --profile production up -d

# Scale services
docker-compose up -d --scale backend=2 --scale frontend=2
```

## 🔧 Configuration

### Environment Variables
Key environment variables in `.env`:

```env
# Database
MONGO_URI=mongodb://admin:password123@mongodb:27017/api-testing-tools?authSource=admin

# Security
JWT_SECRET=your-super-secret-jwt-key-change-in-production

# Server
PORT=5000
NODE_ENV=production
```

### Port Mapping
Default port mappings:
- Frontend: `3000:3000`
- Backend: `5000:5000`
- MongoDB: `27017:27017`
- Nginx: `80:80`, `443:443`

### Volume Mounts
- MongoDB data: `mongodb_data` volume
- Backend code: `./backend:/app`
- Frontend code: `./frontend:/app`

## 📊 Monitoring

### Health Checks
```bash
# Check service health
docker-compose ps

# View health status
docker inspect api-testing-backend | grep -A 10 Health

# Check logs for health issues
docker-compose logs backend | grep health
```

### Resource Usage
```bash
# View resource usage
docker stats

# View disk usage
docker system df

# Prune unused resources
docker system prune -a
```

## 🔒 Security Considerations

### Production Security
1. **Change Default Passwords**:
   ```env
   MONGO_INITDB_ROOT_PASSWORD=your-secure-password
   JWT_SECRET=your-very-secure-jwt-secret
   ```

2. **Use HTTPS**:
   - Configure SSL certificates in `nginx/ssl/`
   - Uncomment HTTPS configuration in `nginx/nginx.conf`

3. **Network Security**:
   - Services communicate via internal network `api-testing-network`
   - Only necessary ports exposed to host

### Environment Security
- Never commit `.env` file to version control
- Use Docker secrets for sensitive data in production
- Regularly update base images

## 🐛 Troubleshooting

### Common Issues

#### Port Conflicts
```bash
# Check what's using ports
netstat -tulpn | grep :3000
netstat -tulpn | grep :5000

# Kill conflicting processes
sudo kill -9 <PID>
```

#### Permission Issues
```bash
# Fix Docker permissions on Linux
sudo usermod -aG docker $USER
newgrp docker
```

#### Build Failures
```bash
# Clear Docker cache
docker system prune -a

# Rebuild without cache
docker-compose build --no-cache
```

#### Database Connection Issues
```bash
# Check MongoDB container
docker-compose exec mongodb mongo -u admin -p password123 --authenticationDatabase admin

# Reset database
docker-compose down -v
docker-compose up -d mongodb
```

### Debug Mode
```bash
# Run with debug logging
docker-compose up -d --build
docker-compose logs -f --tail=100

# Enter container for debugging
docker-compose exec backend sh
docker-compose exec frontend sh
```

## 🔄 Backup and Restore

### Database Backup
```bash
# Create backup
docker-compose exec mongodb mongodump --host localhost --port 27017 --db api-testing-tools --out /backup

# Copy backup to host
docker cp api-testing-mongodb:/backup ./backup-$(date +%Y%m%d)
```

### Database Restore
```bash
# Copy backup to container
docker cp ./backup api-testing-mongodb:/backup

# Restore database
docker-compose exec mongodb mongorestore --host localhost --port 27017 --db api-testing-tools /backup/api-testing-tools
```

## 📈 Performance Optimization

### Production Optimizations
1. **Resource Limits**:
   ```yaml
   deploy:
     resources:
       limits:
         memory: 512M
         cpus: '0.5'
   ```

2. **Caching**:
   - Enable Redis for session storage
   - Configure Nginx caching

3. **Database Optimization**:
   - Use MongoDB Atlas for production
   - Configure proper indexes

### Scaling
```bash
# Horizontal scaling
docker-compose up -d --scale backend=3 --scale frontend=2

# Load balancing with Nginx
# Configure upstream blocks in nginx.conf
```

## 🆙 Updates and Maintenance

### Updating Images
```bash
# Pull latest images
docker-compose pull

# Recreate with new images
docker-compose up -d --force-recreate
```

### Maintenance Tasks
```bash
# Clean up old images
docker image prune -a

# Clean up unused volumes
docker volume prune

# Monitor disk space
docker system df
```

## 📚 Additional Resources

- [Docker Compose Documentation](https://docs.docker.com/compose/)
- [MongoDB Docker Hub](https://hub.docker.com/_/mongo)
- [Next.js Docker Deployment](https://nextjs.org/docs/deployment)
- [Nginx Configuration Guide](https://nginx.org/en/docs/)

## 🤝 Support

For issues related to:
- **Docker Setup**: Check this documentation first
- **Application Issues**: Check main README.md
- **Security Concerns**: Review security section above

---

**Note**: This Docker setup is optimized for development and can be easily adapted for production deployment with proper security configurations.
