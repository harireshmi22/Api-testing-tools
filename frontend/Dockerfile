# step1: build the base image using the official node image

FROM node:20-alpine AS builder

# step 2: set the working directory for the build stage
WORKDIR /app

# step 3: copy package.json and package-lock.json to the working directory
COPY package*.json ./

# step 4: install all dependencies (including dev dependencies for build)
RUN npm ci && npm cache clean --force

# step 5: copy the rest of the application code to the working directory
COPY . .

# step 6: build the application
RUN npm run build

# step 7: create the production image   
FROM node:20-alpine AS production

# create app user and group to run the application with non-root privileges
RUN addgroup -g 1001 -S nodejs && \
    adduser -S nodejs -u 1001

# set working directory for the production image
WORKDIR /app    

# Copy package.json and install only production dependencies
COPY --from=builder /app/package*.json ./
RUN npm ci --only=production && npm cache clean --force

# Copy the built application
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public

# Switch to the non-root user
USER nodejs 

# Expose port 3000 for the application
EXPOSE 3000

# Start the application
CMD ["npm", "start"]
