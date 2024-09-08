package config

import (
	"db-tool/internal/config/db"
	"db-tool/internal/config/environments"
	"db-tool/internal/config/log"
)

func Init() {
	log.Init()
	environments.Init()
	db.Init()

}
