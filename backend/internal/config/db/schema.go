package db

import (
	"gorm.io/gorm"
	"time"
)

type Setting struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt,omitempty" gorm:"index"`
	Key       string         `json:"key" gorm:"unique"`
	Value     string         `json:"value"`
}

type BackUp struct {
	ID        uint           `json:"id" gorm:"primaryKey"`
	CreatedAt time.Time      `json:"createdAt"`
	UpdatedAt time.Time      `json:"updatedAt"`
	DeletedAt gorm.DeletedAt `json:"deletedAt,omitempty" gorm:"index"`
	Filename  string         `json:"filename" gorm:"unique"`
	POC       string         `json:"poc"`
}
