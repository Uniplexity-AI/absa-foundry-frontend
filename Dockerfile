# Build stage
FROM node:24-alpine AS builder

# Install build dependencies
RUN apk add --no-cache \
    python3 \
    make \
    g++ \
    cairo-dev \
    jpeg-dev \
    pango-dev \
    giflib-dev

WORKDIR /app

# Set npm retry & registry to avoid 429 errors
RUN npm set fetch-retries 5 \
    && npm set fetch-retry-factor 2 \
    && npm set fetch-retry-mintimeout 1000 \
    && npm set fetch-retry-maxtimeout 60000 \
    && npm config set registry https://registry.npmmirror.com/

COPY package*.json ./
#RUN npm ci
RUN npm ci --legacy-peer-deps || npm install --legacy-peer-deps
COPY . .

# Build args for Vite environment variables
ARG VITE_GOOGLE_CLIENT_ID
ARG VITE_API_BASE_URL
ARG VITE_ASSETS_MANAGER_MFE_URL
ENV VITE_GOOGLE_CLIENT_ID=$VITE_GOOGLE_CLIENT_ID
ENV VITE_API_BASE_URL=$VITE_API_BASE_URL
ENV VITE_ASSETS_MANAGER_MFE_URL=$VITE_ASSETS_MANAGER_MFE_URL

# Increase Node memory limit for Vite build (avoids heap OOM in constrained Docker env)
ENV NODE_OPTIONS="--max-old-space-size=4096"

RUN npm run build


# Production stage
FROM node:24-alpine

# Install runtime dependencies
RUN apk add --no-cache \
    cairo \
    jpeg \
    pango \
    giflib

WORKDIR /app

# Set npm retry & registry to avoid 429 errors
RUN npm set fetch-retries 5 \
    && npm set fetch-retry-factor 2 \
    && npm set fetch-retry-mintimeout 1000 \
    && npm set fetch-retry-maxtimeout 60000 \
    && npm config set registry https://registry.npmmirror.com/

# Install only production dependencies
COPY package*.json ./
#RUN npm ci --omit=dev --ignore-scripts
RUN npm ci --omit=dev --ignore-scripts --legacy-peer-deps || npm install --omit=dev --ignore-scripts --legacy-peer-deps
# Copy built files and server
COPY --from=builder /app/dist ./dist
COPY server.js ./

EXPOSE 3000
CMD ["node", "server.js"]
