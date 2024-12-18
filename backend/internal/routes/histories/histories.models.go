package histories

import "db-tool/internal/utils"

type QueryHistorianDTO struct {
	Filter struct {
		FromDate string `json:"fromDate,omitempty" form:"filter[fromDate]" validate:"omitempty"`
		ToDate   string `json:"toDate,omitempty" form:"filter[toDate]" validate:"omitempty"`
		Status   string `json:"status,omitempty" form:"filter[status]" validate:"omitempty"`
		Type   string `json:"type,omitempty" form:"filter[type]" validate:"omitempty"`
	} `json:"filter,omitempty" form:"filter"`
	Sort struct {
		Key   string `json:"key,omitempty" form:"sort[key]" validate:"omitempty"`
		Order string `json:"order,omitempty" form:"sort[order]" validate:"omitempty"`
	} `json:"sort,omitempty" form:"sort"`
	utils.Page `json:"page,omitempty" form:"page"`
}

func (q QueryHistorianDTO) GetPage() utils.Page {
	return q.Page
}
