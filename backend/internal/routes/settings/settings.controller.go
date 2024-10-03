package settings

import (
	"db-tool/internal/core/guards"
	"db-tool/internal/core/pipes"
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	route := r.Group("/settings")

	settingService := new(SettingService)
	// Register routes without trailing slashes
	route.GET("", pipes.Query[GetSettingQueryDTO], settingService.getAll)
	route.POST("/:id", guards.BasicAuthGuard(), pipes.Body[UpdateSettingDTO], settingService.update)
	route.POST("/update/db-settings", pipes.Body[DBSettings], settingService.bulkUpdate)
}
