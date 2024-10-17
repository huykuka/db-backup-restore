package auth

import "github.com/gin-gonic/gin"

func Register(r *gin.RouterGroup) {
	route := r.Group("/auth")

	route.POST("/login")
	
}
