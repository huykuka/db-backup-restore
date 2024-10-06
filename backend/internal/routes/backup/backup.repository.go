package backup

import (
	"db-tool/internal/config/db"
	"db-tool/internal/routes/settings"
	"db-tool/internal/strategies/database"
	"db-tool/internal/utils"
	"fmt"
	"github.com/google/uuid"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"os"
	"path/filepath"
)

type BackUpRepository struct{}

type BackUp db.BackUp

var settingRepository = new(settings.SettingRepository)

func (b *BackUpRepository) Backup() (string, error) {
	//Retrieve DB Settings
	dbSetting, err := settingRepository.GetDBSetting()
	if err != nil {
		log.Printf("Failed to retrieve DB configuration: %v\n", err)
		return "", err
	}
	filename, err := database.SelectDB().BackUp(&dbSetting)

	if err != nil {
		return "", err
	}

	return filename, nil
}

func (b *BackUpRepository) CreateBackUp(filename *string) error {
	var backup = BackUp{
		Filename: *filename,
	}

	if err := db.GetDB().Create(&backup).Error; err != nil {
		log.Error(err.Error())
		return err
	}
	return nil
}

func (b *BackUpRepository) Delete(id string) (string, error) {
	// Validate the UUID
	if _, err := uuid.Parse(id); err != nil {
		log.Error("Invalid UUID format")
		return "", err
	}

	var backup BackUp
	if err := db.GetDB().Where("id = ?", id).First(&backup).Error; err != nil {
		log.Error(err.Error())
		return "", err
	}

	if err := db.GetDB().Delete(&backup).Error; err != nil {
		log.Error(err.Error())
		return "", err
	}

	return backup.Filename, nil
}

func (b *BackUpRepository) FindMany(filters *QueryBackupDTO) ([]BackUp, int64, error) {
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
		log.Error(result.Error)
		return nil, 0, result.Error
	}
	return backups, count, nil
}

func (b *BackUpRepository) FindOne(id string) (BackUp, error) {
	var backup BackUp
	if err := db.GetDB().Model(BackUp{}).Where("id = ?", id).First(&backup).Error; err != nil {
		log.Error(err.Error())
		return BackUp{}, err
	}
	return backup, nil
}

func (b *BackUpRepository) BulkDelete(ids *[]string) ([]string, error) {
	var backups []BackUp
	if err := db.GetDB().Where("id IN ?", *ids).Find(&backups).Error; err != nil {
		log.Error(err.Error())
		return nil, err
	}

	if err := db.GetDB().Delete(&BackUp{}, *ids).Error; err != nil {
		log.Error(err.Error())
		return nil, err
	}

	var filenames []string
	for _, backup := range backups {
		filenames = append(filenames, backup.Filename)
	}

	return filenames, nil
}

func (b *BackUpRepository) MoveBackUpFileToArchive(filename *string) {
	// Move the backup file to the archive directory
	archiveDir := "/tmp/archive/backup"
	if _, err := os.Stat(archiveDir); os.IsNotExist(err) {
		err := os.MkdirAll(archiveDir, 0755)
		if err != nil {
			log.Errorf("Failed to create archive directory: %v\n", err)
			return
		}
	}
	// Extract the base filename from the full path
	baseFilename := filepath.Base(*filename)
	// Move the backup file to the archive directory
	err := os.Rename(*filename, fmt.Sprintf("%s/%s", archiveDir, baseFilename))
	if err != nil {
		log.Errorf("Failed to move backup file to archive: %v\n", err)
		return
	}
}

func createFilter(qr *gorm.DB, query *QueryBackupDTO) {
	filter := query.Filter
	// Apply date filter (fromDate)
	if filter.FromDate != "" {
		qr = qr.Where("created_at >= ?", filter.FromDate)
	}

	if filter.ToDate != "" {
		qr = qr.Where("created_at >= ?", filter.FromDate)
	}
}
