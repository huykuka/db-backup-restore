# Use the official Golang image as the base image
FROM golang:1.23-alpine

# Install necessary packages
# Install necessary packages
RUN apk add \
    postgresql-client \
    postgresql-dev


# Install air for live reloading
RUN go install github.com/air-verse/air@latest

# Set the Current Working Directory inside the container
WORKDIR /app

## Copy go.mod and go.sum and download dependencies
COPY . .

RUN go mod download

## Copy the air configuration file
#COPY .air.toml .

# Command to run air for live reloading
CMD ["air"]