package backup

import (
	"db-tool/internal/core/guards"
	"db-tool/internal/core/middlewares"
	"db-tool/internal/core/pipes"
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	route := r.Group("/backup")

	backupService := new(BackupService)

	///Register routes
	route.POST("/", guards.BasicAuthGuard(), middlewares.RateLimiter(rate.NewLimiter(0.1, 1)), backupService.backup)
	route.GET("/list", pipes.Query[QueryBackupDTO], backupService.getBackupList)
	route.POST("/restore/:id", backupService.restoreBackup)
	route.DELETE("/:id", backupService.deleteBackUp)
	route.DELETE("/", pipes.Body[BulkBackupDeleteDTO], backupService.bulkDeleteBackup)

}
