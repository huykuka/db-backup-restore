package db

import (
	"github.com/google/uuid"
	"gorm.io/gorm"
	"time"
)

// Base contains common columns for all tables.
type Base struct {
	ID        string     `gorm:"type:uuid;primary_key;"`
	CreatedAt time.Time  `json:"createdAt"`
	UpdatedAt time.Time  `json:"updatedAt"`
	DeletedAt *time.Time `sql:"index" json:"deletedAt"`
}

// BeforeCreate will set a UUID rather than numeric ID.
func (b *Base) BeforeCreate(tx *gorm.DB) (err error) {
	b.ID = uuid.New().String()
	return
}

type Setting struct {
	Base
	Key   string `json:"key" gorm:"unique"`
	Value string `json:"value"`
}

type BackUp struct {
	Base
	Filename string `json:"filename" gorm:"unique"`
	POC      string `json:"poc"`
}

type History struct {
	Base
	Type   string `json:"type"`
	Status string `json:"status" gorm:"index"`
}
