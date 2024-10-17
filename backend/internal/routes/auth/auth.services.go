package auth

import (
	"db-tool/internal/utils"
	"net/http"

	"github.com/gin-gonic/gin"
)

type AuthSerivce struct {
}

var authRepository = new(AuthRepository)

func (a *AuthSerivce) Login(c *gin.Context) {
	user := c.MustGet("Body").(LoginDTO)
	err := authRepository.Login(&user)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Failed to Login", http.StatusBadRequest)
	}

	c.Set("response", gin.H{
		"messages": " Login successfully",
	})
}
