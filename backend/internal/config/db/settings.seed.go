package db

import (
	"errors"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var settingSeed = []*Setting{
	{
		Key:   "DB_HOST",
		Value: "postgres",
	},
	{
		Key:   "DB_PASSWORD",
		Value: "postgres",
	},
	{
		Key:   "DB_PORT",
		Value: "5432",
	},
	{
		Key:   "DB_USER",
		Value: "postgres",
	},
	{
		Key:   "DB_NAME",
		Value: "postgres-go",
	},
}

func seedSetting(handler *gorm.DB) {
	log.Println("Seeding settings ......")
	for _, setting := range settingSeed {
		var existingSetting Setting
		if err := handler.Where("key = ?", setting.Key).First(&existingSetting).Error; err != nil {
			if errors.Is(gorm.ErrRecordNotFound, err) {
				handler.Create(setting)
			}
		}
	}
}
