# Use the official Golang image as the base image
FROM golang:1.23-alpine

# Install necessary packages
# Install necessary packages
RUN apk add \
    postgresql-client


# Set the Current Working Directory inside the container
WORKDIR /app

## Copy go.mod and go.sum and download dependencies
COPY . .

RUN go mod download
