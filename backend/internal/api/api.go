package api

import (
	"db-tool/internal/core/interceptors"
	"db-tool/internal/core/middlewares"
	"db-tool/internal/routes/backup"
	"db-tool/internal/routes/histories"
	"db-tool/internal/routes/settings"
	"db-tool/internal/routes/users"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	"log"
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
	backup.Register(api)
	settings.Register(api)
	histories.Register(api)

	// Start the Server
	log.Printf("Server is running on port: %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
