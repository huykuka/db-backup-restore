package backup

import (
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	route := r.Group("/backup")

	backupService := new(BackupService)

	///Register routes
	route.POST("/", backupService.backup)
	route.GET("/list", backupService.getBackupList)
	route.POST("/restore/:id", gin.BasicAuth(gin.Accounts{
		"admin": "admin",
	}), backupService.restoreBackup)
}
