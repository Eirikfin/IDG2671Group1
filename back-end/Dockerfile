FROM node:20-alpine

# Set working directory
WORKDIR /app

# Copy package files and install dependencies
COPY package*.json ./
RUN npm install

# Copy the rest of the backend code
COPY . .

# Expose backend port (adjust if needed)
EXPOSE 8201

# Start the server
CMD ["npm", "start"]
