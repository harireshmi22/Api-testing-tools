# step 1:
# base new image on the official node image
# multistage build for production ready image 
FROM node:20-alpine AS builder 

# step 2: 
# set working directory  
WORKDIR /app

# step 3: 
# copy package.json and package-lock.json to the working directory
COPY package*.json ./

# step 4: 
# Install all dependencies (including dev for build)
RUN npm ci && npm cache clean --force 

# step 5: 
# copy the rest of the application code to the working directory
COPY . .

# step 6: 
FROM node:20-alpine AS production

RUN apk add --no-cache dumb-init

# create app user and group to run the application with non-root privileges
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# set working directory for the production image
WORKDIR /app

# Copy only the necessary files from the builder stage to the production image
COPY --from=builder /app/package*.json ./
COPY --from=builder /app ./

# Switch to the non-root user 
USER nodejs

# Expose port 5000 for the application
EXPOSE 5000

# Start the application using dumb-init to handle signals properly  
ENTRYPOINT ["dumb-init", "npm", "start"]    
CMD ["node", "server.js"]
