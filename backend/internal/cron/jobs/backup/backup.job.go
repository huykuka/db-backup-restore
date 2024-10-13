package backup

import (
	"db-tool/internal/routes/backup"

	log "github.com/sirupsen/logrus"
)

type BackUpTask struct {
}

var backupRepository = new(backup.BackUpRepository)

func (*BackUpTask) Run() {
	// Backup the database
	handleBackupError := func(err error) {
		if err != nil {
			log.WithFields(log.Fields{}).Error(err.Error())
		}
	}

	filename, err := backupRepository.Backup()
	if err != nil {
		handleBackupError(err)
		return
	}

	// Save the backup record to database
	err = backupRepository.CreateBackUp(&filename)
	if err != nil {
		handleBackupError(err)
		return
	}
}
