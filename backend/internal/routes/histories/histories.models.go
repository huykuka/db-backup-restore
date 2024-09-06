package histories

import "db-tool/utils"

type QueryHistorianDTO struct {
	Filter struct {
		FromDate string `json:"fromDate,omitempty" form:"filter[fromDate]" validate:"omitempty"`
		ToDate   string `json:"toDate,omitempty" form:"filter[toDate]" validate:"omitempty"`
		Status   string `json:"status,omitempty" form:"filter[fromDate]" validate:"omitempty"`
	} `json:"filter,omitempty" form:"filter"`
	utils.Page `json:"page,omitempty" form:"page"`
}
