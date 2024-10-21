# Use Alpine as the base image
FROM alpine:latest

# # Install necessary runtime dependencies
RUN apk add --no-cache postgresql-client

# Set the working directory
WORKDIR /app

COPY backend/output ./

# Ensure the binary is executable
RUN chmod +x ./main.bin

# Set environment variables
ENV CGO_ENABLED=1
ENV GIN_MODE=release

# Expose the application port
EXPOSE 8080

# Command to run the binary
CMD ["./main.bin"]
