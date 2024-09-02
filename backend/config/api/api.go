package api

import (
	"db-tool/internal/core/middlewares"
	user "db-tool/internal/routes/users"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
)

var Api *gin.RouterGroup

func ServeEndPoints() {
	port := os.Getenv("PORT")
	//Setup GIN
	r := gin.Default()
	r.Use(middlewares.Logger())
	//Serving static

	//

	//Serving API
	Api = r.Group("/api")

	//Register modules
	user.Serve(Api)
	////

	fmt.Println("Server is running on port: ", port)

	err := r.Run(":" + port)
	if err != nil {
		panic("Can not start server")
	}
}
