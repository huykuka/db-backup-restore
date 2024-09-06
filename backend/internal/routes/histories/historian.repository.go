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
	page := query.Page
	// Apply date filter (fromDate)
	if filter.FromDate != "" {
		qr = qr.Where("createdAt >= ?", query.Filter.FromDate)
	}

	if query.Filter.ToDate != "" {
		qr = qr.Where("createdAt >= ?", query.Filter.FromDate)
	}

	// Apply pagination
	if page.Size > 0 {
		if page.Number > 0 {
			offset := (page.Number - 1) * page.Size
			qr = qr.Offset(offset).Limit(page.Size)
		} else {
			qr = qr.Limit(page.Size)
		}
	}
}
