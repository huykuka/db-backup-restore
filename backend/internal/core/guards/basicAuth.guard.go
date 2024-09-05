package guards

import (
	"github.com/gin-gonic/gin"
	"os"
)

var username = os.Getenv("SECRET_USERNAME")
var password = os.Getenv("SECRET_PASSWORD")

func BasicAuthGuard() gin.HandlerFunc {
	return gin.BasicAuth(gin.Accounts{
		"admin": "admin",
	})
}
