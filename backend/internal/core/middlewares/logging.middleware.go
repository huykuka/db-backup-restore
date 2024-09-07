package middlewares

import (
	"github.com/gin-gonic/gin"
	"github.com/sirupsen/logrus"
)

func ErrorLogger(log *logrus.Logger) gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next() // Process the request

		// Check if an error was set
		if errMsg, exists := c.Get("error"); exists {
			// Log the error using Logrus
			log.WithFields(logrus.Fields{
				"status_code": c.Writer.Status(),
				"error":       errMsg,
			}).Error("An error occurred during the request")
		}
	}
}
