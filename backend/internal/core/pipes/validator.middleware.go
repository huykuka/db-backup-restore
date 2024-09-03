package pipes

import (
	"db-tool/internal/core/interceptors"
	"fmt"
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"net/http"
)

var validate = validator.New()

func BodyValidator[T any](c *gin.Context) {
	var dto T // Data Transfer Object
	if err := c.ShouldBindJSON(&dto); err != nil {
		jsonApiError := interceptors.JSONAPIError{
			Status: http.StatusText(http.StatusBadRequest),
			Title:  "Invalid Request Body",
			Detail: err.Error(),
		}
		jsonApiResponse := interceptors.JSONAPIResponse{
			Errors: []interceptors.JSONAPIError{jsonApiError},
		}
		jsonApiResponse.JSONAPI.Version = "1.1"
		jsonApiResponse.Links = map[string]string{
			"self": c.Request.URL.String(),
		}
		c.AbortWithStatusJSON(http.StatusBadRequest, jsonApiResponse)
		return
	}

	if err := validate.Struct(dto); err != nil {
		jsonApiError := interceptors.JSONAPIError{
			Status: http.StatusText(http.StatusBadRequest),
			Title:  "Validation Error",
			Detail: fmt.Sprintf("Invalid input"),
		}
		jsonApiResponse := interceptors.JSONAPIResponse{
			Errors: []interceptors.JSONAPIError{jsonApiError},
		}
		jsonApiResponse.JSONAPI.Version = "1.1"
		jsonApiResponse.Links = map[string]string{
			"self": c.Request.URL.String(),
		}
		c.AbortWithStatusJSON(http.StatusBadRequest, jsonApiResponse)
		return
	}
	c.Next()
}
