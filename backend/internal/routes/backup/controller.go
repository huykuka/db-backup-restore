package backup

import (
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	route := r.Group("/backup")

	backupService := new(BackupService)
	///Register routes
	route.GET("/", backupService.backupHandler)
}
