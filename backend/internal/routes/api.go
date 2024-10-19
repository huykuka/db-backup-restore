package routes

import (
	"db-tool/internal/core/interceptors"
	"db-tool/internal/routes/auth"
	"db-tool/internal/routes/backup"
	"db-tool/internal/routes/health"
	"db-tool/internal/routes/histories"
	"db-tool/internal/routes/restore"
	"db-tool/internal/routes/settings"
	"db-tool/internal/routes/users"
	"embed"
	"io/fs"
	"net/http"
	"os"
	"strings"
	"time"

	"github.com/gin-contrib/cors"
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	ginlogrus "github.com/toorop/gin-logrus"
)

// Embed the web directory
//
//go:embed web
var static embed.FS

func Init() {
	port := os.Getenv("PORT")
	if port == "" {
		port = "8080" // Default port if not specified
	}

	r := gin.New()
	// CORS configuration to allow all origins and expose all headers
	r.Use(cors.New(cors.Config{
		AllowAllOrigins:  true,
		AllowMethods:     []string{"GET", "POST", "PUT", "DELETE", "OPTIONS"},
		AllowHeaders:     []string{"*"},
		ExposeHeaders:    []string{"*"},
		AllowCredentials: true,
		MaxAge:           12 * time.Hour,
	}))

	// Set a lower memory limit for multipart forms (default is 32 MiB)
	r.MaxMultipartMemory = 64 << 20 // 64MiB
	// Middleware registration
	r.Use(ginlogrus.Logger(log.StandardLogger()), gin.Recovery())
	r.Use(interceptors.JsonApiInterceptor())

	// Serving API
	api := r.Group("/api")

	// Routes registration
	users.Register(api)
	backup.Register(api)
	settings.Register(api)
	restore.Register(api)
	histories.Register(api)
	health.Register(api)
	auth.Register(api)

	// Create a sub-filesystem for the "web" directory
	contentStatic, err := fs.Sub(static, "web")
	if err != nil {
		log.Fatal(err)
	}

	// Middleware to serve static files if the path does not match /api/*
	r.Use(func(c *gin.Context) {
        if !strings.HasPrefix(c.Request.URL.Path, "/api/") {
            http.FileServer(http.FS(contentStatic)).ServeHTTP(c.Writer, c.Request)
            c.Abort()
        }
    })

	// Start the Server
	log.Printf("Server is running on port: %s", port)
	if err := r.Run(":" + port); err != nil {
		log.Fatalf("Failed to start server: %v", err)
	}
}
