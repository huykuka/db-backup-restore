package settings

import (
	"db-tool/internal/config/db"
)

type SettingRepository struct{}

func (s *SettingRepository) findMany() ([]db.Setting, error) {
	var settings []db.Setting
	result := db.GetDB().Model(&db.Setting{}).Find(&settings)
	if result.Error != nil {
		return nil, result.Error
	}
	return settings, nil
}
