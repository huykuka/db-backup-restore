package histories

import "db-tool/internal/utils"

type QueryHistorianDTO struct {
	Filter struct {
		FromDate string `json:"fromDate,omitempty" form:"filter[fromDate]" validate:"omitempty"`
		ToDate   string `json:"toDate,omitempty" form:"filter[toDate]" validate:"omitempty"`
		Status   string `json:"status,omitempty" form:"filter[status]" validate:"omitempty"`
	} `json:"filter,omitempty" form:"filter"`
	utils.Page `json:"page,omitempty" form:"page"`
}

func (q QueryHistorianDTO) GetPage() utils.Page {
	return q.Page
}
