# Use a multi-stage build to separate the frontend and backend build processes

# Stage 1: Build Frontend
FROM node:20-alpine AS frontend-builder

# Set the working directory
WORKDIR /app/frontend

# Copy the frontend source code
COPY frontend/package*.json ./
COPY frontend/ ./

# Install dependencies and build the frontend
RUN npm i --verbose

RUN npm run build

# Stage 2: Build Backend
FROM golang:1.23-alpine AS backend-builder

# Set the working directory
WORKDIR /app/backend

RUN apk add --no-cache gcc musl-dev 
# Copy the backend source code
COPY backend/go.mod backend/go.sum ./
RUN go mod download

# Copy the rest of the backend source code
COPY backend/ ./

# Copy the frontend build output to the backend's web directory
COPY --from=frontend-builder /app/frontend/dist/frontend ./web

# Build the backend
RUN go build -o  ./tmp/main ./cmd/db-tool/main.go

# Stage 3: Final Image (Slimmed Down)
# Use Alpine as the base image
FROM alpine:latest

# # Install necessary runtime dependencies
RUN apk add --no-cache postgresql-client

# Set the working directory
WORKDIR /app

# Copy the backend build output from the build stage
COPY --from=backend-builder /app/backend/tmp/main ./main

# Ensure the binary is executable
RUN chmod +x ./main

# Set environment variables
ENV CGO_ENABLED=1
ENV GIN_MODE=release

# Expose the application port
EXPOSE 8080

# Command to run the binary
CMD ["./main"]
