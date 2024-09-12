package restore

import (
	"db-tool/internal/routes/histories"
	"db-tool/internal/utils"
	"github.com/gin-gonic/gin"
)

type RestoreService struct{}

var restoreRepository = new(RestoreRepository)
var historianRepository = new(histories.HistoriesRepository)

func (r *RestoreService) restore(c *gin.Context) {
	id := c.Param("id")
	err := restoreRepository.Restore(id)
	if err != nil {
		handleRestoreError(c, err, "Restore failed!")
		return
	}
	err = historianRepository.Create(&histories.History{
		Status: "success",
		Type:   "restore",
	})
	if err != nil {
		return
	}
	c.Set("response", gin.H{
		"message": "Restore completed",
	})
}

func handleRestoreError(c *gin.Context, err error, message string) {
	utils.HandleHTTPError(c, err.Error(), message)
	historyErr := historianRepository.Create(&histories.History{
		Status: "failed",
		Type:   "restore",
	})
	if historyErr != nil {
		return
	}
}
