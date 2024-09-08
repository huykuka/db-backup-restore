package settings

import (
	"db-tool/internal/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

type SettingService struct {
}

var settingRepository = new(SettingRepository)

func (s *SettingService) getAll(c *gin.Context) {
	query, _ := c.MustGet("Query").(GetSettingQueryDTO)
	settings, err := settingRepository.findMany(&query)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not retrieve Settings", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"settings": settings,
	})
}

func (s *SettingService) update(c *gin.Context) {
	//Extract Context data
	req, _ := c.MustGet("Body").(UpdateSettingDTO)
	id := c.Param("id")

	setting, err := settingRepository.update(&id, &req)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not edit Setting", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"setting": setting,
	})
}
