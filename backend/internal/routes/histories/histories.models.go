package histories

type QueryHistorianDTO struct {
	Filter struct {
		FromDate string `json:"fromDate,omitempty" form:"filter[fromDate]" validate:"omitempty"`
		ToDate   string `json:"toDate,omitempty" form:"filter[toDate]" validate:"omitempty"`
		Status   string `json:"status,omitempty" form:"filter[fromDate]" validate:"omitempty"`
	} `json:"filter,omitempty" form:"filter"`
	Page struct {
		Size   int `json:"fromDate,omitempty" form:"page[number]" validate:"omitempty"`
		Number int `json:"toDate,omitempty" form:"page[size]" validate:"omitempty"`
	} `json:"page,omitempty" form:"page"`
}
