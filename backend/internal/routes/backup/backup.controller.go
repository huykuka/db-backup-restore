package backup

import (
	"db-tool/internal/core/pipes"
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	route := r.Group("/backup")

	backupService := new(BackupService)

	///Register routes
	route.POST("/", backupService.backup)
	route.GET("/list", pipes.Query[QueryBackup], backupService.getBackupList)
	route.DELETE("/:id", backupService.deleteBackup)
	route.POST("/restore/:id", backupService.restoreBackup)
}
