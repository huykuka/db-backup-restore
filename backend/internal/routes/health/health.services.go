package health

import (
	"db-tool/internal/routes/settings"
	"db-tool/internal/strategies/database"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
)

type HealthService struct{}

var settingRepository = new(settings.SettingRepository)

func (h *HealthService) healthCheck(c *gin.Context) {

	dbSetting, err := settingRepository.GetDBSetting()
	if err != nil {
		log.Printf("Failed to retrieve DB configuration: %v\n", err)
		c.Set("response", gin.H{
			"message": "notok",
		})
		return
	}
	err = database.SelectDB().HealthCheck(&dbSetting)
	if err == nil {
		c.Set("response", gin.H{
			"message": "ok",
		})
	} else {
		c.Set("response", gin.H{
			"message": "notok",
		})
	}
}
