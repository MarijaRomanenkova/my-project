FROM node:18-alpine

# Install OpenSSL - using the correct package name
RUN apk add --no-cache openssl

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# Copy dependency files
COPY package*.json ./
COPY prisma ./prisma/

# Install dependencies using npm
RUN npm install

# Generate Prisma client
RUN npx prisma generate

# Copy application code
COPY . .

# Build the application
RUN npm run build

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 3000

CMD npx prisma migrate deploy && npm start 
