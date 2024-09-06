package backup

import (
	"db-tool/internal/config/db"
	"db-tool/utils"
	"fmt"
	"gorm.io/gorm"
	"log"
	"os"
	"os/exec"
	"path/filepath"
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

func (b *BackUpRepository) createBackUp(filename *string) error {
	var backup = BackUp{
		Filename: *filename,
	}

	if err := db.GetDB().Create(&backup).Error; err != nil {
		log.Println(err.Error())
		return err
	}
	return nil
}

func (b *BackUpRepository) delete(id string) (string, error) {
	var backup BackUp
	if err := db.GetDB().First(&backup, id).Error; err != nil {
		log.Println(err.Error())
		return "", err
	}

	if err := db.GetDB().Delete(&backup).Error; err != nil {
		log.Println(err.Error())
		return "", err
	}

	return backup.Filename, nil
}

func (b *BackUpRepository) findMany(filters *QueryBackupDTO) ([]BackUp, int64, error) {
	var backups []BackUp
	var count int64

	qr := db.GetDB().Model(&db.BackUp{})
	createFilter(qr, filters)

	// Get the total count of records that match the filters
	qr.Count(&count)

	// Apply filter and get the records
	utils.CreatePaging[QueryBackupDTO](qr, *filters)
	result := qr.Find(&backups)
	if result.Error != nil {
		log.Println(result.Error)
		return nil, 0, result.Error
	}
	return backups, count, nil
}

func (b *BackUpRepository) bulkDelete(ids *[]string) ([]string, error) {
	var backups []BackUp
	if err := db.GetDB().Where("id IN ?", *ids).Find(&backups).Error; err != nil {
		log.Println(err.Error())
		return nil, err
	}

	if err := db.GetDB().Delete(&BackUp{}, *ids).Error; err != nil {
		log.Println(err.Error())
		return nil, err
	}

	var filenames []string
	for _, backup := range backups {
		filenames = append(filenames, backup.Filename)
	}

	return filenames, nil
}

func (b *BackUpRepository) moveBackUpFileToArchive(filename *string) {
	// Move the backup file to the archive directory
	archiveDir := "/tmp/archive/backup"
	if _, err := os.Stat(archiveDir); os.IsNotExist(err) {
		err := os.MkdirAll(archiveDir, 0755)
		if err != nil {
			log.Printf("Failed to create archive directory: %v\n", err)
			return
		}
	}
	// Extract the base filename from the full path
	baseFilename := filepath.Base(*filename)
	// Move the backup file to the archive directory
	err := os.Rename(*filename, fmt.Sprintf("%s/%s", archiveDir, baseFilename))
	if err != nil {
		log.Printf("Failed to move backup file to archive: %v\n", err)
		return
	}
}

func createFilter(qr *gorm.DB, query *QueryBackupDTO) {
	filter := query.Filter
	// Apply date filter (fromDate)
	if filter.FromDate != "" {
		qr = qr.Where("createdAt >= ?", query.Filter.FromDate)
	}

	if query.Filter.ToDate != "" {
		qr = qr.Where("createdAt >= ?", query.Filter.FromDate)
	}
}
