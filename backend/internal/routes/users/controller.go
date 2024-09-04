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
	route.GET("/", pipes.Query[GetUserQuery], userService.getAll)
	route.GET("/:id", userService.getByID)
	route.PATCH("/:id", pipes.Body[UpdateUserDTO], userService.update)
	route.POST("/", pipes.Body[CreateUserDTO], userService.create)
}
