package restore

import "github.com/gin-gonic/gin"

func Register(r *gin.RouterGroup) {
	route := r.Group("/restore")
	restoreService := new(RestoreService)

	route.POST("/:id", restoreService.restore)
	route.POST("/upload", restoreService.upload)
}
