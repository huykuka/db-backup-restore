package guards

import (
	"os"

	"github.com/gin-gonic/gin"
)

var username = "Test"
var password = os.Getenv("SECRET_PASSWORD")

func BasicAuthGuard() gin.HandlerFunc {
	return gin.BasicAuth(gin.Accounts{
		username: password,
	})
}
