package users

import (
	"db-tool/internal/core/pipes"
	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	route := r.Group("/users")

	userService := new(UserService)
	///Register routes
	route.GET("/", userService.getAll)
	route.GET("/:id", userService.getByID)
	route.PATCH("/:id", pipes.BodyValidator[UpdateUserDTO], userService.update)
	route.POST("/", pipes.BodyValidator[CreateUserDTO], userService.create)
}
