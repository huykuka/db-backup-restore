# Stage 1: Build the Go application
FROM golang:1.23-alpine AS builder

# Set the working directory inside the container
WORKDIR /app

# Copy the Go module files and download dependencies
COPY go.mod go.sum ./
RUN go mod download

# Copy the rest of the application source code
COPY . .

# Build the Go application
RUN go build -o server

RUN echo "Building the Go application"

# Stage 2: Create a minimal image with the built application
FROM ubuntu:24.04

# Update package list and install required packages
RUN apt-get update && \
    apt-get install -y postgresql-client postgresql-client-common libpq-dev
# Set the working directory inside the container
WORKDIR /app

# Copy the built application from the builder stage
COPY --from=builder /app/server .

COPY ./docker/entrypoint.sh /entrypoint.sh

# Expose the port the application runs on (if applicable)
EXPOSE 8081

RUN chmod +x /entrypoint.sh

RUN #echo "Building the Go application"