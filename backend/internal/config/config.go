package config

import (
	"db-tool/internal/config/environments"
	"db-tool/internal/config/logger"
)

func Init() {
	environments.Init()
	logger.Init()
}
