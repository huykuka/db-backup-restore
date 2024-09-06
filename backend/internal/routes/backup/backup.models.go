package backup

type QueryBackup struct {
	Filter struct {
		FromDate string `json:"fromDate,omitempty" form:"filter[fromDate]" validate:"omitempty"`
		ToDate   string `json:"toDate,omitempty" form:"filter[toDate]" validate:"omitempty"`
	} `json:"filter,omitempty" form:"filter"`
}
