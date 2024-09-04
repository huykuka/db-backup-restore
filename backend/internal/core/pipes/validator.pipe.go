package pipes

import (
	"fmt"
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
		c.Error(fmt.Errorf("Invalid Input"))
		// Set the status code to 400
		c.Set("statusCode", http.StatusBadRequest)
	}

	structValidate(c, dto)
}

func Query[T any](c *gin.Context) {
	var query T // Data Transfer Object
	// Bind JSON to the DTO
	if err := c.ShouldBindQuery(&query); err != nil {
		log.Printf("Validation Error: %v", err)
		// Append the error to the context without aborting the request
		c.Error(fmt.Errorf("Invalid query"))
		// Set the status code to 400
		c.Set("statusCode", http.StatusBadRequest)
	}
	structValidate(c, query)
}

func structValidate[T any](c *gin.Context, dto T) {
	// Validate the DTO using the validator instance
	if err := validate.Struct(dto); err != nil {
		log.Printf("Validation Error: %v", err)
		// Append the validation error to the context without aborting the request
		c.Error(fmt.Errorf("Invalid query"))

		// Set the status code to 400
		c.Set("statusCode", http.StatusBadRequest)
	}

	// Proceed to the next middleware or handler
	c.Next()
}
