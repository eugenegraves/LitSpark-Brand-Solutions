# LitSpark Brand Solutions - Development Dockerfile
# Multi-stage build for optimized development experience

# Base stage with common dependencies
FROM node:16-alpine AS base
WORKDIR /app
ENV NODE_ENV=development
RUN apk add --no-cache python3 make g++ git

# Development dependencies stage
FROM base AS dev-deps
COPY package*.json ./
RUN npm install

# Client dependencies stage
FROM base AS client-deps
WORKDIR /app/src/client
COPY src/client/package*.json ./
RUN npm install

# Development stage
FROM base AS development
WORKDIR /app
COPY --from=dev-deps /app/node_modules ./node_modules
COPY --from=client-deps /app/src/client/node_modules ./src/client/node_modules
COPY . .

# Expose ports for server and client
EXPOSE 5000 3000

# Command to run development server
CMD ["npm", "run", "dev"]
