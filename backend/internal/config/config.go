package config

import (
	"db-tool/internal/config/db"
	"db-tool/internal/config/environments"
)

func Init() {
	environments.Init()
	db.Init()
}
