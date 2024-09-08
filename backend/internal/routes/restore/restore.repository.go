package restore

import (
	"db-tool/internal/config/db"
	"db-tool/internal/routes/backup"
	"db-tool/internal/routes/settings"
	log "github.com/sirupsen/logrus"
	"os"
	"os/exec"
)

type BackUp db.BackUp
type RestoreRepository struct{}

var backupRepository = new(backup.BackUpRepository)
var settingRepository = new(settings.SettingRepository)

func (r *RestoreRepository) Restore(backupId string) error {

	//Find Backup file
	backUp, err := backupRepository.FindOne(backupId)
	if err != nil {
		return err
	}

	//Retrieve DB Settings
	dbSetting, err := settingRepository.GetDBSetting()
	if err != nil {
		log.Printf("Failed to retrieve DB configuration: %v\n", err)
		return err
	}

	if err := os.Setenv("PGPASSWORD", dbSetting.Password); err != nil {
		return err
	}

	//Execute Restore command
	cmd := exec.Command("pg_restore", "-U", dbSetting.User, "-h", dbSetting.Host, "-p", dbSetting.Port, "-d", dbSetting.DbName, "-v", backUp.Filename)
	cmd.Stdout, cmd.Stderr = os.Stdout, os.Stderr

	if err := cmd.Run(); err != nil {
		log.Printf("Restore failed: %v\n", err)
		return err
	}

	log.Printf("Restore completed: %s\n", backUp.Filename)
	return nil
}
