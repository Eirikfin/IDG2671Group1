# Build stage
FROM node:20-alpine AS build

WORKDIR /app

# Allow build-time argument for API URL
ARG VITE_API_URL
ENV VITE_API_URL=$VITE_API_URL

COPY package*.json ./
RUN npm install
COPY . .

# This picks up VITE_API_URL during Vite build
RUN npm run build

# Production stage
FROM nginx:alpine

# Copy custom nginx config
COPY nginx.conf /etc/nginx/conf.d/default.conf

# Copy built app
COPY --from=build /app/dist /usr/share/nginx/html

EXPOSE 8181
CMD ["nginx", "-g", "daemon off;"]