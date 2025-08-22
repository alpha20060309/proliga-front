# Stage 1: Build
FROM node:22-alpine AS builder

WORKDIR /app

# Copy package files for dependency installation
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm i -g pnpm

# Install all dependencies (including devDependencies for build)
RUN pnpm i

# Copy source code
COPY . .

# Copy Prisma schema
COPY prisma ./prisma

# Generate Prisma client
RUN npx prisma generate

# Build Next.js app
RUN pnpm build

# Stage 2: Runtime
FROM node:22-alpine

WORKDIR /app

# Create non-root user for security
RUN addgroup -S appgroup && adduser -S appuser -G appgroup

# Copy package files for production dependencies
COPY package.json pnpm-lock.yaml ./

# Install pnpm globally
RUN npm i -g pnpm

RUN npm i -g dotenv-cli
# Install only production dependencies
RUN pnpm i --prod

# Copy built Next.js output from builder stage
COPY --from=builder /app/.next ./.next
COPY --from=builder /app/public ./public
COPY --from=builder /app/prisma ./prisma

# Copy .env.production file (optional, if you want to bake it into the image)
COPY .env.production ./

# Generate Prisma client in production
RUN npx prisma generate

# Fix permissions for appuser on .next directory
RUN chown -R appuser:appgroup /app/.next

# Set non-root user
USER appuser

# Expose port (Next.js default)
EXPOSE 3030

# Set environment for production
ENV NODE_ENV=production

# Run Next.js app
CMD ["pnpm", "start"]