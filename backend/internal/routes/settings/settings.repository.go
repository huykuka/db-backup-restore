package settings

import (
	"db-tool/internal/config/db"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"strings"
)

type Setting db.Setting

type SettingRepository struct{}

type DBSetting struct {
	User      string
	Host      string
	Port      string
	Password  string
	DbName    string
	BackUpDir string
}

func createFilter(qr *gorm.DB, query *GetSettingQueryDTO) {
	filter := query.Filter
	///NAme must be exact
	if filter.Name != "" {
		qr = qr.Where("UPPER(key) = ?", strings.ToUpper(filter.Name))
	}
	// Check if Category is provided, apply category LIKE %filter.Category%
	if filter.Category != "" {
		qr = qr.Where("UPPER(key) LIKE ?", strings.ToUpper(filter.Category)+"%")
	}
}

func (s *SettingRepository) findMany(filters *GetSettingQueryDTO) ([]Setting, error) {
	var settings []Setting
	qr := db.GetDB().Model(&db.Setting{})
	createFilter(qr, filters)
	result := qr.Find(&settings)
	if result.Error != nil {
		log.Error(result.Error)
		return nil, result.Error
	}
	return settings, nil
}

func (s *SettingRepository) update(id *string, data *UpdateSettingDTO) (*Setting, error) {
	var setting Setting
	// Find the existing setting by ID
	if err := db.GetDB().Model(&Setting{}).Where("id = ?", id).First(&setting).Error; err != nil {
		log.Error(err.Error())
		return nil, err
	}

	// Update the setting with the provided data
	if err := db.GetDB().Model(&setting).Updates(data).Error; err != nil {
		log.Error(err.Error())
		return nil, err
	}

	// Return the updated setting
	return &setting, nil
}

func (s *SettingRepository) GetDBSetting() (DBSetting, error) {
	var settings []Setting
	qr := db.GetDB().Model(&db.Setting{}).Where("UPPER(key) LIKE ?", "DB_%")
	result := qr.Find(&settings)
	if result.Error != nil {
		log.Error(result.Error)
		return DBSetting{}, nil
	}

	dbSetting := DBSetting{}
	for _, setting := range settings {
		switch strings.ToUpper(setting.Key) {
		case "DB_USER":
			dbSetting.User = setting.Value
		case "DB_HOST":
			dbSetting.Host = setting.Value
		case "DB_PORT":
			dbSetting.Port = setting.Value
		case "DB_PASSWORD":
			dbSetting.Password = setting.Value
		case "DB_NAME":
			dbSetting.DbName = setting.Value
		case "DB_BACKUP_DIR":
			dbSetting.BackUpDir = setting.Value
		}
	}

	return dbSetting, nil
}
