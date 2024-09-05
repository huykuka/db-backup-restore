package backup

import (
	"db-tool/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"os/exec"
	"time"
)

type BackupService struct{}

func (b *BackupService) backupHandler(c *gin.Context) {
	err := backup()
	if err != nil {
		utils.HandleError(c, "Backup failed!", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"message": "Backup completed",
	})

}

func backup() (err error) {

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
			fmt.Printf("Failed to create backup directory: %v\n", err)
			return err
		}
	}
	os.Setenv("PGPASSWORD", password) // Uncomment if password is needed

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
		fmt.Printf("Backup failed: %v\n", err)
		return err
	}

	fmt.Printf("Backup completed: %s\n", backupFile)
	return nil
}
