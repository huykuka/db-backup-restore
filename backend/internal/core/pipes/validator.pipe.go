package pipes

import (
	"db-tool/utils"
	"log"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

func Body[T any](c *gin.Context) {
	var dto T // Data Transfer Object
	// Bind JSON to the DTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		log.Printf("Validation Error: %v", err)
		// Append the error to the context without aborting the request
		utils.HandleError(c, "Invalid Input", http.StatusBadRequest)
		c.Next()
	}

	c.Set("Body", dto)

	structValidate(c, &dto)
}

func Query[T any](c *gin.Context) {
	var query T // Data Transfer Object
	// Bind JSON to the DTO
	if err := c.ShouldBindQuery(&query); err != nil {
		log.Printf("Validation Error: %v", err)
		// Append the error to the context without aborting the request
		utils.HandleError(c, "Invalid Query", http.StatusBadRequest)
		c.Next()
	}
	c.Set("Query", query)

	structValidate(c, &query)
}

func structValidate[T any](c *gin.Context, dto *T) {
	// Validate the DTO using the validator instance
	if err := validate.Struct(dto); err != nil {
		log.Printf("Validation Error: %v", err)
		// Append the validation error to the context without aborting the request
		utils.HandleError(c, "Invalid Input", http.StatusBadRequest)
	}

	// Proceed to the next middleware or handler
	c.Next()
}
