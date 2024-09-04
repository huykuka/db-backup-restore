package db

import (
	"gorm.io/driver/sqlite"
	"gorm.io/gorm"
)

var Handler *gorm.DB

func Init() {
	var err error
	Handler, err = gorm.Open(sqlite.Open("app.db"), &gorm.Config{})
	if err != nil {
		panic("failed to connect database")
	}
	err = Handler.AutoMigrate(&Setting{})

	if err != nil {
		return
	}

	seedDB(Handler)
}

func GetDB() *gorm.DB {
	return Handler
}

func seedDB(handler *gorm.DB) {
	seedSetting(handler)
}
