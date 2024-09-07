package histories

import (
	"db-tool/internal/config/db"
	"db-tool/utils"
	"gorm.io/gorm"
	"log"
	"strings"
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

func (h *HistoriesRepository) FindMany(filters *QueryHistorianDTO) ([]History, int64, error) {
	var histories []History
	var count int64

	qr := db.GetDB().Model(&History{})
	createFilter(qr, filters)

	// Get the total count of records that match the filters
	qr.Count(&count)

	// Apply filter and get the records
	utils.CreatePaging[QueryHistorianDTO](qr, *filters)
	result := qr.Find(&histories)
	if result.Error != nil {
		log.Println(result.Error)
		return nil, 0, result.Error
	}
	return histories, count, nil
}

func createFilter(qr *gorm.DB, query *QueryHistorianDTO) {
	filter := query.Filter
	// Apply date filter (fromDate)
	if filter.FromDate != "" {
		qr = qr.Where("createdAt >= ?", filter.FromDate)
	}

	if filter.ToDate != "" {
		qr = qr.Where("createdAt >= ?", filter.FromDate)
	}

	if filter.Status != "" {
		qr = qr.Where("UPPER(status) LIKE ?", strings.ToUpper(filter.Status)+"%")
	}
}
