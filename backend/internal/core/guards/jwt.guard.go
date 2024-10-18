package guards

import (
	jwttoken "db-tool/internal/core/services/jwt-token"
	"db-tool/internal/utils"
	"net/http"
	"strings"

	"github.com/gin-gonic/gin"
	"github.com/golang-jwt/jwt"
)
type JWTService interface {
	ValidateToken(tokenString string) (*jwt.Token, error)
}


func JWTAuthGuard() gin.HandlerFunc {
	return func(c *gin.Context) {
		authHeader := c.GetHeader("Authorization")
		if authHeader == "" {
			utils.HandleHTTPError(c, "Authorization header is required", "Invalid Header", http.StatusUnauthorized)
			return
		}

		bearerToken := strings.Split(authHeader, " ")
		if len(bearerToken) != 2 || strings.ToLower(bearerToken[0]) != "bearer" {
			utils.HandleHTTPError(c, "Invalid authorization header format", "Invalid Header", http.StatusUnauthorized)
			return
		}

		token, err := jwttoken.NewJWTService().ValidateToken(bearerToken[1])

		if err != nil || !token.Valid {
			utils.HandleHTTPError(c, "Invalid or expired token", "Invalid or expired token", http.StatusUnauthorized)
			return
		}

		claims, ok := token.Claims.(jwt.MapClaims)
		if !ok {
			utils.HandleHTTPError(c, "Failed to parse token claims", "Invalid or expired token", http.StatusUnauthorized)
			return
		}

		// You can add the claims to the context if needed
		c.Set("username", claims["email"])

		c.Next()
	}
}
