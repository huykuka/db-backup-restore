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
	route.POST("/restore/:id", backupService.restoreBackup)
	route.DELETE("/:id", backupService.deleteBackUp)
	//route.DELETE("/", deleteBulk)

}
