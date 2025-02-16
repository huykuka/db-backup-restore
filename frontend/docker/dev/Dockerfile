# Use the official lightweight Node.js 20 Alpine image as the base image
FROM node:20-alpine

# Set the working directory inside the container
WORKDIR /app

# Copy package.json and package-lock.json (if available) to the working directory
COPY package*.json ./

# Install dependencies
RUN npm install --verbose

# Copy the rest of the application code to the working directory
COPY . .

# Expose the port that the app runs on
EXPOSE 4200
