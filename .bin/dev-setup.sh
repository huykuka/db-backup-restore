#!/bin/sh
echo "$1"
# Check for an argument to decide whether to update or not
if [ "$1" == "reset" ]; then
    echo "Pruning system and rebuilding images..."

    # Prune unused Docker objects
    docker system prune -a -f
    docker image prune -a -f
    docker builder prune -a -f
    docker buildx prune -a -f
    docker volume prune -a -f

    # Rebuild and start services with Docker Compose
    docker compose -f docker-compose.dev.yml up --build
else
    echo "Starting services without pruning or rebuilding..."

    # Just start the services without rebuilding
    docker compose -f docker-compose.dev.yml up
fi
