package utils

type Page struct {
	Size   int `json:"fromDate,omitempty" form:"page[size]" validate:"omitempty,gt=0"`
	Number int `json:"toDate,omitempty" form:"page[number]" validate:"omitempty,gt=0"`
}
