package config

import (
	"db-tool/internal/config/db"
	"db-tool/internal/config/environments"
	"db-tool/internal/config/logger"
)

func Init() {
	environments.Init()
	logger.Init()
	db.Init()
}
