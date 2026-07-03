# Use official Node.js LTS image
FROM node:18-alpine

# Set working directory
WORKDIR /usr/src/app

# Copy dependency files first (layer caching)
COPY package*.json ./
RUN npm install --production

# Copy rest of the application
COPY . .

# Expose app port
EXPOSE 3000

# Start the app
CMD ["node", "app.js"]