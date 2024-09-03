package api

import (
	"db-tool/internal/core/interceptors"
	"db-tool/internal/core/middlewares"
	"db-tool/internal/routes/users"
	"fmt"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"os"
)

var api *gin.RouterGroup

func Init() {
	port := os.Getenv("PORT")
	//Setup GIN
	r := gin.Default()

	r.Use(static.Serve("/", static.LocalFile("web", false)))
	r.Use(middlewares.Logger())
	r.Use(interceptors.JsonApiInterceptor())

	//Serving API
	api = r.Group("/api")

	//Register modules
	users.Register(api)

	//Start the Server
	fmt.Println("Server is running on port: ", port)
	err := r.Run(":" + port)
	if err != nil {
		panic("Can not start server")
	}
}
