package users

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
)

type Service struct{}

func New() *Service {
	return &Service{
		// Initialize your service fields here
	}
}
func (u *Service) getAll(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func (u *Service) getByID(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"id": id,
	})
}

func (u *Service) create(c *gin.Context) {
	// If validation passes
	fmt.Println(c.Request.Body)
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}

func (u *Service) update(c *gin.Context) {
	id := c.Param("id")
	var jsonData UpdateUserDTO
	if err := c.ShouldBindBodyWithJSON(&jsonData); err != nil {
		fmt.Println(jsonData)
	}
	// If validation passes
	c.JSON(http.StatusOK, gin.H{
		"message": "User updated successfully",
		"id":      id,
	})
}
