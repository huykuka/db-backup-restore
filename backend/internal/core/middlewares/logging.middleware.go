package middlewares

import (
	"github.com/gin-gonic/gin"
)

func Logger() gin.HandlerFunc {
	return func(c *gin.Context) {
		// Start timer
		c.Next()
		// access the status we are sending
		//status := c.Writer.Status()
		//log.Println(status)
	}
}
