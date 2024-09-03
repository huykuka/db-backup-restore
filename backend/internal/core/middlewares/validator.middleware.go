package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"net/http"
)

var validate = validator.New()

func BodyValidator[T any](c *gin.Context) {
	var dto T //Data Transfer Object
	if err := c.ShouldBindBodyWithJSON(&dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		c.Abort()
		return
	}

	if err := validate.Struct(dto); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": "Invalid User Input"})
		c.Abort()
		return
	}

	c.Next()
}
