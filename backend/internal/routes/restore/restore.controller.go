package restore

import "github.com/gin-gonic/gin"

func Register(route *gin.RouterGroup) {
	route.Group("/restore")

	restoreService := new(RestoreService)

	route.POST("/:id", restoreService.restore)
}
