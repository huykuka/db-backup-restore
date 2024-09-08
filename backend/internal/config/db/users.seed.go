package db

import (
	"db-tool/internal/services"
	"errors"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
	"os"
)

var userSeed = []*User{
	{
		Name:     os.Getenv("SECRET_USERNAME"),
		Email:    os.Getenv("SECRET_EMAIL"),
		Password: services.HashPassword(os.Getenv("SECRET_PASSWORD")),
	},
}

func seedUser(handler *gorm.DB) {
	log.Println("Seeding settings ......")
	for _, setting := range userSeed {
		var user User
		if err := handler.Where("email = ?", user.Email).First(&user).Error; err != nil {
			if errors.Is(gorm.ErrRecordNotFound, err) {
				handler.Create(setting)
			}
		}
	}
}
