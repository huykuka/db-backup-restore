package restore

import (
	"db-tool/utils"
	"github.com/gin-gonic/gin"
)

type RestoreService struct{}

var restoreRepository = new(RestoreRepository)

func (r *RestoreService) restore(c *gin.Context) {
	id := c.Param("id")
	err := restoreRepository.Restore(id)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Restore failed!")
		return
	}

	c.Set("response", gin.H{
		"message": "Restore completed",
	})

}
