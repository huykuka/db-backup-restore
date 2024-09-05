package settings

import (
	"db-tool/internal/config/db"
	"gorm.io/gorm"
	"log"
	"strings"
)

type Setting db.Setting

type SettingRepository struct{}

func createFilter(qr *gorm.DB, query *GetSettingQuery) {
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

func (s *SettingRepository) findMany(filters *GetSettingQuery) ([]Setting, error) {
	var settings []Setting
	qr := db.GetDB().Model(&db.Setting{})
	createFilter(qr, filters)
	result := qr.Find(&settings)
	if result.Error != nil {
		log.Println(result.Error)
		return nil, result.Error
	}
	return settings, nil
}

func (s *SettingRepository) update(id string, data *UpdateSettingDTO) (*Setting, error) {
	var setting Setting
	// Find the existing setting by ID
	if err := db.GetDB().Model(&Setting{}).Where("id = ?", id).First(&setting).Error; err != nil {
		log.Println(err.Error())
		return nil, err
	}

	// Update the setting with the provided data
	if err := db.GetDB().Model(&setting).Updates(data).Error; err != nil {
		log.Println(err.Error())
		return nil, err
	}

	// Return the updated setting
	return &setting, nil
}
