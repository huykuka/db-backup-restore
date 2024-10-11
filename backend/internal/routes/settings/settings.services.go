package settings

import (
	"db-tool/internal/utils"
	"fmt"
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

func (s *SettingService) bulkUpdate(c *gin.Context) {
	// Extract Context data
	req, _ := c.MustGet("Body").(DBSettings)
	updatedSettings := make([]*Setting, 0)

	// Map the DBSettings fields to their corresponding keys
	settingsMap := map[string]string{
		"DB_HOST":     req.DBHost,
		"DB_NAME":     req.DBName,
		"DB_PASSWORD": req.DBPassword,
		"DB_PORT":     fmt.Sprintf("%d", req.DBPort),
		"DB_USER":     req.DBUser,
	}

	for key, value := range settingsMap {
		// Find the setting by key
		existingSetting, err := settingRepository.FindByKey(key)
		if err != nil {
			utils.HandleHTTPError(c, err.Error(), "Can not find Setting", http.StatusBadRequest)
			return
		}

		// Update the setting value
		existingSetting.Value = value

		// Save the updated setting
		updatedSetting, err := settingRepository.update(&existingSetting.ID, &UpdateSettingDTO{Value: value})
		if err != nil {
			utils.HandleHTTPError(c, err.Error(), "Can not edit Setting", http.StatusBadRequest)
			return
		}

		updatedSettings = append(updatedSettings, updatedSetting)
	}

	c.Set("response", gin.H{
		"settings": updatedSettings,
	})
}
