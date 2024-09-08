package restore

import (
	"db-tool/internal/config/db"
	"db-tool/internal/routes/backup"
	log "github.com/sirupsen/logrus"
	"os"
	"os/exec"
)

type BackUp db.BackUp
type RestoreRepository struct{}

var backupRepository = new(backup.BackUpRepository)

func (r *RestoreRepository) Restore(backupId string) error {
	// Restore the backup
	//Find the backup with the given id then restore it
	backup, err := backupRepository.FindOne(backupId)
	if err != nil {
		return err
	}
	//Define variables
	user := "postgres"
	host := "postgres"
	port := "5432"
	dbName := "postgres-go"
	backupFile := backup.Filename
	password := "postgres"

	err = os.Setenv("PGPASSWORD", password)
	if err != nil {
		return err
	} // Uncomment if password is needed

	//Execute the restore command
	cmd := exec.Command("pg_restore",
		"-U", user,
		"-h", host,
		"-p", port,
		"-d", dbName,
		"-v",
		backupFile,
	)
	// Run the pg_restore command
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err = cmd.Run()
	if err != nil {
		log.Printf("Restore failed: %v\n", err)
		return err
	}

	log.Printf("Restore completed: %s\n", backupFile)
	return nil
}
