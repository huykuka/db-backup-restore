package backup

import (
	"db-tool/internal/config/db"
	"fmt"
	"gorm.io/gorm"
	"log"
	"os"
	"os/exec"
	"time"
)

type BackUpRepository struct{}

type BackUp db.BackUp

func (b *BackUpRepository) backup() (filename string, err error) {

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
			return "", err
		}
	}
	err = os.Setenv("PGPASSWORD", password)
	if err != nil {
		return "", err
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
		return "", err
	}

	log.Printf("Backup completed: %s\n", backupFile)
	return backupFile, nil
}

func (b *BackUpRepository) createBackUp(filename string) error {
	var backup = BackUp{
		Filename: filename,
	}

	if err := db.GetDB().Create(&backup).Error; err != nil {
		log.Println(err.Error())
		return err
	}
	return nil
}

func (b *BackUpRepository) delete(id string) error {
	if err := db.GetDB().Delete(&BackUp{}, id).Error; err != nil {
		log.Println(err.Error())
		return err
	}
	return nil
}

func (b *BackUpRepository) findMany(filters *QueryBackup) ([]BackUp, error) {
	var backups []BackUp
	qr := db.GetDB().Model(&db.BackUp{})
	createFilter(qr, filters)
	result := qr.Find(&backups)
	if result.Error != nil {
		log.Println(result.Error)
		return nil, result.Error
	}
	return backups, nil
}

func createFilter(qr *gorm.DB, query *QueryBackup) {
	filter := query.Filter
	// Apply date filter (fromDate)
	if filter.FromDate != "" {
		qr = qr.Where("createdAt >= ?", query.Filter.FromDate)
	}

	if query.Filter.ToDate != "" {
		qr = qr.Where("createdAt >= ?", query.Filter.FromDate)
	}
}
