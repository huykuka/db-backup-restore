package config

import (
	"db-tool/internal/config/environments"
	"db-tool/internal/config/logger"
)

func Init() {
	environments.Init()

	logger.Init()
	///Must be run last because it will block the application

}
