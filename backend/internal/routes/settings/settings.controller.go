package settings

import (
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	route := r.Group("/settings")

	settingService := new(SettingService)
	///Register routes
	route.GET("/", settingService.getAll)

}
