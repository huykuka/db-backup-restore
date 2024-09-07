package middlewares

import (
	"db-tool/utils"
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
	"net/http"
)

func RateLimiter(limiter *rate.Limiter) gin.HandlerFunc {
	return func(c *gin.Context) {
		if limiter.Allow() {
			c.Next()
		} else {
			utils.HandleError(c, "Rate limit exceed", "Rate Limit exceed", http.StatusTooManyRequests)
		}
	}
}
