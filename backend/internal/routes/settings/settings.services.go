package settings

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type SettingService struct {
}

var settingRepository = new(SettingRepository)

func (s *SettingService) getAll(c *gin.Context) {
	settings, err := settingRepository.findMany()
	if err != nil {
		c.Error(fmt.Errorf("can not retrieve settings"))
		// Set the status code to 400
		c.Set("statusCode", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"settings": settings,
	})
}
