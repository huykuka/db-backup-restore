package user

import (
	"github.com/gin-gonic/gin"
)

func Serve(r *gin.RouterGroup) {
	r.GET("/users", getAll)
	r.GET("/users/:id", getByID)
	r.POST("/users", create)
}
