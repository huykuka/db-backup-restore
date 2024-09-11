# Use the official Golang image as the base image
FROM golang:1.23-alpine

# Install necessary packages

RUN apk add --no-cache gcc musl-dev postgresql-client

RUN go install github.com/air-verse/air@latest
# Set the Current Working Directory inside the container
WORKDIR /app

## Copy go.mod and go.sum and download dependencies
COPY . .

RUN go mod download

ENV CGO_ENABLED=1