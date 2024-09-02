package config

import (
	"db-tool/config/api"
	"db-tool/config/environments"
	"db-tool/config/logger"
)

func Init() {
	environments.SetupEnvironments()
	logger.Setup()

	///Must be run last because it will block the application
	api.ServeEndPoints()
}
