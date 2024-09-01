#!/bin/sh
docker system prune -a -f --volumes
docker image prune -a -f
docker volume prune -a -f

docker compose -f docker-compose.dev.yml up -w --build