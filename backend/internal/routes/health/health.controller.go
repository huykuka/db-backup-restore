package health

import (
	"db-tool/internal/core/guards"
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	route := r.Group("/health", guards.JWTAuthGuard())
	healthService := new(HealthService)
	route.GET("/database", healthService.healthCheck)
}
