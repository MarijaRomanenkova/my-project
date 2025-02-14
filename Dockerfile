FROM node:18-alpine

# Install OpenSSL - using the correct package name
RUN apk add --no-cache openssl

# Install pnpm globally
RUN npm install -g pnpm

# Add non-root user
RUN addgroup -S appgroup && adduser -S appuser -G appgroup
WORKDIR /app

# Copy dependency files
COPY package*.json pnpm-lock.yaml ./
COPY prisma ./prisma/

# Install dependencies using pnpm
RUN pnpm install

# Generate Prisma client
RUN npx prisma generate

# Copy application code
COPY . .

# Build the application
RUN pnpm run build

# Set ownership to non-root user
RUN chown -R appuser:appgroup /app

# Switch to non-root user
USER appuser

EXPOSE 3000

CMD npx prisma migrate deploy && pnpm start 
