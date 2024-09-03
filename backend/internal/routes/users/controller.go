package users

import (
	"db-tool/internal/config/di"
	"db-tool/internal/core/middlewares"
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	userService := di.Handler.UserService
	route := r.Group("/users")

	///Register routes
	route.GET("/", userService.getAll)
	route.GET("/:id", userService.getByID)
	route.PATCH("/:id", middlewares.BodyValidator[UpdateUserDTO], userService.update)
	route.POST("/", middlewares.BodyValidator[CreateUserDTO], userService.create)
}
