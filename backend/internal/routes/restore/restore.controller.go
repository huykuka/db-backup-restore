package restore

import (
	"db-tool/internal/core/pipes"

	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	route := r.Group("/restore")
	restoreService := new(RestoreService)

	route.POST("/upload", restoreService.upload)
	route.POST("/manual", pipes.Body[ManualRestoreDTO], restoreService.manualRestore)
	route.POST("/:id", restoreService.restore)
}
