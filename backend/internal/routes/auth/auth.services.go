package auth

import (
	jwttoken "db-tool/internal/core/services/jwt-token"
	"db-tool/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthSerivce struct {
}

var authRepository = new(AuthRepository)
var jwtService = jwttoken.NewJWTService()

func (a *AuthSerivce) Login(c *gin.Context) {
	dto := c.MustGet("Body").(LoginDTO)
	user, err := authRepository.Login(&dto)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Failed to Login", http.StatusUnauthorized)
	}

	accessToken, err := jwtService.GenerateAccessToken(user.Email)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Failed to Login", http.StatusUnauthorized)
	}

	c.Set("response", gin.H{
		"messages":    " Login successfully",
		"email":       user.Email,
		"accessToken": accessToken,
	})
}
