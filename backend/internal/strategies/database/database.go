package database

import (
	"db-tool/internal/routes/settings"
	"db-tool/internal/strategies/database/postgresql"
	log "github.com/sirupsen/logrus"
)

type DBType interface {
	BackUp(*settings.DBSetting) (filename string, err error)
	Restore(*settings.DBSetting, *string) error
}

type Database struct {
	DBType
}

// Define a map to store database types and their corresponding strategies
var dbStrategies = map[string]DBType{
	"postgresql": &postgresql.PostgreSQL{},
	"mysql":      &postgresql.PostgreSQL{},
}

var settingRepository = new(settings.SettingRepository)

func SelectDB() *Database {
	setting, err := settingRepository.FindByKey("GENERAL_DB_TYPE")
	if err != nil || setting == nil {
		log.Error("Failed to find GENERAL_DB_TYPE setting: ", err)
		return nil
	}

	dbStrategy, exists := dbStrategies[setting.Value]
	if !exists {
		log.Error("Unsupported database type: ", setting.Value)
		return nil
	}

	return &Database{
		DBType: dbStrategy,
	}
}
