package api

import (
	"db-tool/internal/core/interceptors"
	"db-tool/internal/core/middlewares"
	"db-tool/internal/routes/users"
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
	users.Register(api)

	r.Use(interceptors.JsonApiInterceptor())

	fmt.Println("Server is running on port: ", port)
	err := r.Run(":" + port)
	if err != nil {
		panic("Can not start server")
	}
}
