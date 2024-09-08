package middlewares

import (
	"db-tool/internal/utils"
	"github.com/gin-gonic/gin"
	"golang.org/x/time/rate"
	"net/http"
)

func RateLimiter(limiter *rate.Limiter) gin.HandlerFunc {
	return func(c *gin.Context) {
		if limiter.Allow() {
			c.Next()
		} else {
			utils.HandleHTTPError(c, "Rate limit exceed", "Rate Limit exceed", http.StatusTooManyRequests)
		}
	}
}
