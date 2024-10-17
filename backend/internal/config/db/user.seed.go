package db

import (
	"errors"
	"os"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

var usersSeed = []*User{
	{
		Email:    os.Getenv("SECRET_USERNAME"),
		Password: os.Getenv("SECRET_PASSWROD"),
	},
}

func seedUser(handler *gorm.DB) {
	log.Println("Seeding users ......")
	for _, user := range usersSeed {
		var existingUser User
		if err := handler.Where("email = ?", user.Email).First(&existingUser).Error; err != nil {
			if errors.Is(err, gorm.ErrRecordNotFound) {
				handler.Create(user)
			}
		}
	}
}
