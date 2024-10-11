package health

import (
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	route := r.Group("/health")
	healthService := new(HealthService)
	route.GET("/database", healthService.healthCheck)
}
