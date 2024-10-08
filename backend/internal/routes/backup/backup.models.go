package backup

import "db-tool/internal/utils"

type QueryBackupDTO struct {
	Filter struct {
		FromDate string `json:"fromDate,omitempty" form:"filter[fromDate]" validate:"omitempty"`
		ToDate   string `json:"toDate,omitempty" form:"filter[toDate]" validate:"omitempty"`
	} `json:"filter,omitempty" form:"filter"`
	utils.Page `json:"page,omitempty" form:"page"`
}

func (q QueryBackupDTO) GetPage() utils.Page {
	return q.Page
}

type BulkBackupDeleteDTO struct {
	Ids []string `json:"ids" validate:"required"`
}
