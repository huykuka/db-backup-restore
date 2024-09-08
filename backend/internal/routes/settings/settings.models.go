package settings

type UpdateSettingDTO struct {
	Key   string `json:"key,omitempty" validate:"omitempty"`
	Value string `json:"value" validate:"required"`
}

type GetSettingQueryDTO struct {
	Filter struct {
		Name     string `json:"name,omitempty" form:"filter[name]" validate:"omitempty"`
		Category string `json:"category,omitempty" form:"filter[category]" validate:"omitempty"`
	} `json:"filter,omitempty"`
}
