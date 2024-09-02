package user

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type User struct {
	ID   string `json:"id" validate:"required,uuid4"`
	Name string `json:"name" validate:"required,min=3,max=32"`
	Age  int    `json:"age" validate:"required,min=3,max=32"`
}

func (u *User) getAll(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func (u *User) getByID(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"id": id,
	})
}

func (u *User) create(c *gin.Context) {
	// If validation passes
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}
