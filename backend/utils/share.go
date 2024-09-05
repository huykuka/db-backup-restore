package utils

import (
	"fmt"
	"github.com/gin-gonic/gin"
)

func HandleError(c *gin.Context, errMsg string, statusCode int) {
	c.Error(fmt.Errorf(errMsg))
	c.Set("statusCode", statusCode)
}
