package middlewares

import (
	"github.com/gin-gonic/gin"
)

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Start timer
		c.Next()
		// Log the request details
	}
}
