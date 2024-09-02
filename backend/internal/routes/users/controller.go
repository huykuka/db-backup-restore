package user

import (
	"github.com/gin-gonic/gin"
)

func Serve(r *gin.RouterGroup) {
	user := new(User)
	r.GET("/users", user.getAll)
	r.GET("/users/:id", user.getByID)
	r.POST("/users", user.create)
}
