# 1. Base Image: Use official lightweight Node.js 20 Linux image
FROM node:20-alpine AS builder

# 2. Set working directory inside the container
WORKDIR /app

# 3. Copy package files first (helps Docker cache layers efficiently)
COPY package*.json ./

# 4. Install all dependencies
RUN npm install

# 5. Copy the rest of the application source code
COPY . .

# 6. Build the NestJS TypeScript code into production JavaScript
RUN npm run build

# --- Production Stage ---
FROM node:20-alpine AS runner

WORKDIR /app

# Copy package files and install only production dependencies
COPY package*.json ./
RUN npm install --only=production

# Copy the built dist directory from the builder stage
COPY --from=builder /app/dist ./dist

# Expose port 3000 (documentation rule for Docker)
EXPOSE 3000

# Command to run the application
CMD ["node", "dist/main.js"]