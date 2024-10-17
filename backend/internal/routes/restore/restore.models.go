package restore

type ManualRestoreDTO struct {
	FilePath string `json:"filePath,omitempty" validate:"required"`
}
