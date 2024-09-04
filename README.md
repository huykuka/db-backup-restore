# PostgreSQL Backup and Restore Tool

This tool is used to backup and restore PostgreSQL databases. It is built using Go-Gin for backend and React for frontend and Docker.

### Prerequisites

- Docker 
- Docker Compose version v2.29.1-desktop.1 (required)


## Dev Environment

In the main directory, run the following command to start the Docker containers:

```bash
sh ./bin/dev-setup.sh
```

If you want to clear all the data and start fresh, run the following command:

```bash
sh ./bin/dev-setup.sh reset
```

If you want to destroy the environment, run the following command:

```bash
sh ./bin/dev-setup.sh destroy
```

