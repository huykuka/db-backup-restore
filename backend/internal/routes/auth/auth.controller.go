package auth

import (
	"db-tool/internal/core/guards"
	"db-tool/internal/core/middlewares"
	"db-tool/internal/core/pipes"

	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	route := r.Group("/auth")
	authService := new(AuthService)
	route.POST("/login", middlewares.PublicApiMiddleware(), pipes.Body[LoginDTO], authService.Login)
	route.GET("/validate", guards.JWTAuthGuard(), authService.Validate)
}
