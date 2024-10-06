package restore

import (
	"db-tool/internal/config/db"
	"db-tool/internal/routes/backup"
	"db-tool/internal/routes/settings"
	"db-tool/internal/strategies/database"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
)

type BackUp db.BackUp
type RestoreRepository struct{}

var backupRepository = new(backup.BackUpRepository)
var settingRepository = new(settings.SettingRepository)

func (r *RestoreRepository) Restore(id string) error {
	if _, err := uuid.Parse(id); err != nil {
		log.Error("Invalid UUID format")
		return err
	}
	//Find Backup file
	backUp, err := backupRepository.FindOne(id)
	if err != nil {
		return err
	}

	//Retrieve DB Settings
	dbSetting, err := settingRepository.GetDBSetting()
	if err != nil {
		log.Printf("Failed to retrieve DB configuration: %v\n", err)
		return err
	}

	//Restore DB
	err = database.SelectDB().Restore(&dbSetting, &backUp.Filename)

	if err != nil {
		return err
	}
	return nil
}
