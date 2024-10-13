package histories

import (
	"db-tool/internal/config/db"
	"db-tool/internal/utils"
	"fmt"
	"strings"

	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

type HistoriesRepository struct {
}

type History db.History

func (h *HistoriesRepository) Create(history *History) error {
	if err := db.GetDB().Create(history).Error; err != nil {
		log.Error(err.Error())
		return err
	}
	return nil
}

func (h *HistoriesRepository) FindMany(query *QueryHistorianDTO) ([]History, int64, error) {
	var histories []History
	var count int64

	qr := db.GetDB().Model(&History{})
	createFilter(qr, query)
	createSort(qr, query)
	// Get the total count of records that match the filters
	qr.Count(&count)

	// Apply filter and get the records
	utils.CreatePaging[QueryHistorianDTO](qr, *query)
	result := qr.Find(&histories)
	if result.Error != nil {
		log.Error(result.Error)
		return nil, 0, result.Error
	}
	return histories, count, nil
}

func (h *HistoriesRepository) Count(query *QueryHistorianDTO) (int64, error) {
	var count int64

	qr := db.GetDB().Model(&History{})
	createFilter(qr, query)
	createSort(qr, query)
	// Get the total count of records that match the filters
	qr.Count(&count)

	return count, nil
}

func createFilter(qr *gorm.DB, query *QueryHistorianDTO) {
	filter := query.Filter
	// Apply date filter (fromDate)
	if filter.FromDate != "" {
		qr = qr.Where("created_at >= ?", filter.FromDate)
	}

	if filter.ToDate != "" {
		qr = qr.Where("created_at <= ?", filter.ToDate)
	}

	if filter.Status != "" {
		qr = qr.Where("UPPER(status) LIKE ?", strings.ToUpper(filter.Status)+"%")
	}

	if filter.Type != "" {
		qr = qr.Where("UPPER(type) LIKE ?", strings.ToUpper(filter.Type)+"%")
	}
}

func createSort(qr *gorm.DB, query *QueryHistorianDTO) {
	sort := query.Sort
	// Apply sorting if key is provided
	if sort.Key != "" {
		qr = qr.Order(fmt.Sprintf("%s %s", sort.Key, sort.Order))
	}
}
