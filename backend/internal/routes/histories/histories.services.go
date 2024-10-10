package histories

import (
	"db-tool/internal/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

type HistoriesService struct {
}

var historiesRepository = new(HistoriesRepository)

func (s *HistoriesService) getAll(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryHistorianDTO)
	statuses, total, err := historiesRepository.FindMany(&query)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not retrieve histories", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"statuses": statuses,
		"total":    total,
	})
}

func (s *HistoriesService) download(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryHistorianDTO)
	statuses, _, err := historiesRepository.FindMany(&query)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not retrieve histories", http.StatusBadRequest)
		return
	}
	c.Header("Content-Type", "application/zip")

	c.Set("response", gin.H{
		"statuses": statuses,
	})
}
