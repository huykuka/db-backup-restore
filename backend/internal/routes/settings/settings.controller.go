package settings

import (
	"db-tool/internal/core/pipes"
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	route := r.Group("/settings")

	settingService := new(SettingService)
	///Register routes
	route.GET("/", pipes.Query[GetSettingQuery], settingService.getAll)
	route.POST("/:id", pipes.Body[UpdateSettingDTO], settingService.update)
}
