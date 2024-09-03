package api

import (
	"db-tool/internal/core/middlewares"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
)

var api *gin.RouterGroup

func Init() {
	port := os.Getenv("PORT")
	//Setup GIN
	r := gin.Default()
	r.Use(middlewares.Logger())
	//Serving static

	//

	//Serving API
	api = r.Group("/api")

	//Register modules

	////

	fmt.Println("Server is running on port: ", port)

	err := r.Run(":" + port)
	if err != nil {
		panic("Can not start server")
	}
}
