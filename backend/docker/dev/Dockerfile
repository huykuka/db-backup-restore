# Use the official Golang image as the base image
FROM golang:1.23-alpine

# Install necessary packages

RUN apk add --no-cache gcc musl-dev postgresql-client bash git

RUN go install github.com/air-verse/air@latest
# Set the Current Working Directory inside the container
WORKDIR /app

## Copy go.mod and go.sum and download dependencies
COPY . .

RUN go mod download

ENV TERM=xterm-256color
ENV GIN_MODE=release
ENV CGO_ENABLED=1