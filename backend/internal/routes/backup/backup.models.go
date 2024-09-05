package backup

type QueryBackup struct {
	Filter struct {
		FromDate string `json:"fromDate,omitempty" form:"fromDate" validate:"omitempty"`
		ToDate   string `json:"toDate,omitempty" form:"toDate" validate:"omitempty"`
	} `json:"filter,omitempty" form:"filter"`
}
