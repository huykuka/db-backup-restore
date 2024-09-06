package histories

import (
	"db-tool/internal/config/db"
	"gorm.io/gorm"
	"log"
)

type HistoriesRepository struct {
}

type History db.History

func (h *HistoriesRepository) Create(status string) error {
	var backup = History{
		Status: status,
	}

	if err := db.GetDB().Create(&backup).Error; err != nil {
		log.Println(err.Error())
		return err
	}
	return nil

}

func (h *HistoriesRepository) FindMany(filters *QueryHistorianDTO) ([]History, error) {
	var histories []History
	qr := db.GetDB().Model(&History{})
	createFilter(qr, filters)
	result := qr.Find(&histories)
	if result.Error != nil {
		log.Println(result.Error)
		return nil, result.Error
	}
	return histories, nil
}

func createFilter(qr *gorm.DB, query *QueryHistorianDTO) {
	filter := query.Filter
	// Apply date filter (fromDate)
	if filter.FromDate != "" {
		qr = qr.Where("createdAt >= ?", query.Filter.FromDate)
	}

	if query.Filter.ToDate != "" {
		qr = qr.Where("createdAt >= ?", query.Filter.FromDate)
	}

	// Apply pagination
	if query.Page.Number > 0 && query.Page.Size > 0 {
		offset := (query.Page.Number - 1) * query.Page.Size
		qr = qr.Offset(offset).Limit(query.Page.Size)
	}
}
