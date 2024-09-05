package backup

import (
	"fmt"
	"log"
	"os"
	"os/exec"
	"time"
)

type BackUpRepository struct{}

func (b *BackUpRepository) backup() (err error) {

	//Define variables
	user := "postgres"
	host := "postgres"
	port := "5432"
	password := "postgres"
	dbName := "postgres-go"
	backupDir := os.Getenv("BACKUP_PATH")
	backupFile := fmt.Sprintf("%s/%s_%s.sql", backupDir, time.Now().Format("20060102150405"), dbName)

	// Create the backup directory if it doesn't exist
	if _, err := os.Stat(backupDir); os.IsNotExist(err) {
		err := os.MkdirAll(backupDir, 0755)
		if err != nil {
			log.Printf("Failed to create backup directory: %v\n", err)
			return err
		}
	}
	err = os.Setenv("PGPASSWORD", password)
	if err != nil {
		return err
	} // Uncomment if password is needed

	// Build the pg_dump command
	cmd := exec.Command("pg_dump",
		"-U", user,
		"-h", host,
		"-p", port,
		"-F", "c",
		"-b",
		"-v",
		"-f", backupFile,
		dbName,
	)

	//Set the password environment variable if needed

	// Run the pg_dump command
	cmd.Stdout = os.Stdout
	cmd.Stderr = os.Stderr
	err = cmd.Run()
	if err != nil {
		log.Printf("Backup failed: %v\n", err)
		return err
	}

	log.Printf("Backup completed: %s\n", backupFile)
	return nil
}
