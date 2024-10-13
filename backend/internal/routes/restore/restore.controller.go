package restore

import "github.com/gin-gonic/gin"

func Register(r *gin.RouterGroup) {
	route := r.Group("/restore")
	restoreService := new(RestoreService)

	route.POST("/upload", restoreService.upload)
	route.POST("/:id", restoreService.restore)
}
