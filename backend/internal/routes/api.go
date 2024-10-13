package routes

import (
	"db-tool/internal/core/interceptors"
	"db-tool/internal/routes/backup"
	"db-tool/internal/routes/health"
	"db-tool/internal/routes/histories"
	"db-tool/internal/routes/restore"
	"db-tool/internal/routes/settings"
	"db-tool/internal/routes/users"
	"os"

	"github.com/gin-contrib/cors"
	"github.com/gin-contrib/static"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	ginlogrus "github.com/toorop/gin-logrus"
)

func Init() {
	port := os.Getenv("PORT")

	r := gin.New()
	r.Use(cors.Default())
	// Set a lower memory limit for multipart forms (default is 32 MiB)
	r.MaxMultipartMemory = 64 // 64MiB
	//Middleware registration
	r.Use(ginlogrus.Logger(log.StandardLogger()), gin.Recovery())
	r.Use(static.Serve("/", static.LocalFile("web", false)))
	r.Use(interceptors.JsonApiInterceptor())

	//Serving API
	api := r.Group("/api")

	//Routes registration
	users.Register(api)
	backup.Register(api)
	settings.Register(api)
	restore.Register(api)
	histories.Register(api)
	health.Register(api)

	// Start the Server
	log.Printf("Server is running on port: %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
