package settings

type UpdateSettingDTO struct {
	Key   string `json:"key,omitempty" validate:"omitempty"`
	Value string `json:"value" validate:"required"`
}

type DBSettings struct {
	DBHost     string `json:"dbHost" validate:"required" mapstructure:"DB_HOST"`
	DBName     string `json:"dbName" validate:"required" mapstructure:"DB_NAME"`
	DBPassword string `json:"password" validate:"required" mapstructure:"DB_PASSWORD"`
	DBPort     int    `json:"port" validate:"required" mapstructure:"DB_PORT"`
	DBUser     string `json:"username" validate:"required" mapstructure:"DB_USER"`
}

type GetSettingQueryDTO struct {
	Filter struct {
		Name     string `json:"name,omitempty" form:"filter[name]" validate:"omitempty"`
		Category string `json:"category,omitempty" form:"filter[category]" validate:"omitempty"`
	} `json:"filter,omitempty"`
}
