package restore

import (
	"db-tool/internal/utils"

	"github.com/gin-gonic/gin"
)

type RestoreService struct{}

var restoreRepository = new(RestoreRepository)

func (r *RestoreService) restore(c *gin.Context) {
	id := c.Param("id")
	err := restoreRepository.Restore(id)
	if err != nil {
		handleRestoreError(c, err, "Restore failed!")
		return
	}
	if err != nil {
		return
	}
	c.Set("response", gin.H{
		"message": "Restore completed",
	})
}

func handleRestoreError(c *gin.Context, err error, message string) {
	utils.HandleHTTPError(c, err.Error(), message)
}
