package logger

import (
	"github.com/gin-gonic/gin"
	"io"
	"os"
)

func Init() {
	gin.ForceConsoleColor()
	// Logging to a file.
	f, _ := os.Create("gin.log")
	gin.DefaultWriter = io.MultiWriter(f, os.Stdout)
}
