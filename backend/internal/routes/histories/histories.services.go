package histories

import (
	"db-tool/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

type HistoriesService struct {
}

var historiesRepository = new(HistoriesRepository)

func (s *HistoriesService) getAll(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryHistorianDTO)
	settings, total, err := historiesRepository.FindMany(&query)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not retrieve histories", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"settings": settings,
		"total":    total,
	})
}
