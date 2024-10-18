package histories

import (
	"db-tool/internal/core/guards"
	"db-tool/internal/core/middlewares"
	"db-tool/internal/core/pipes"

	"github.com/gin-gonic/gin"
)

func Register(r *gin.RouterGroup) {
	//Similar to inject() in Nestjs
	route := r.Group("/histories", guards.JWTAuthGuard())
	//
	historyService := new(HistoriesService)

	route.GET("", pipes.Query[QueryHistorianDTO], historyService.getAll)
	route.GET("/download", pipes.Query[QueryHistorianDTO], middlewares.NoJsonAPI(), historyService.downloadCSV)
}
