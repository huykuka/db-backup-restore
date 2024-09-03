package config

import (
	"db-tool/internal/config/api"
	"db-tool/internal/config/di"
	"db-tool/internal/config/environments"
	"db-tool/internal/config/logger"
)

func Init() {
	environments.SetupEnvironments()
	di.Init()
	logger.Init()
	///Must be run last because it will block the application

	api.Init()
}
