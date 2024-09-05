package guards

import (
	"fmt"
	"net/http"

	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

var validate = validator.New()

// TODO add JWT validator here
func BodyValidator[T any](c *gin.Context) {
	var dto T // Data Transfer Object

	// Bind JSON to the DTO
	if err := c.ShouldBindJSON(&dto); err != nil {
		// Append the error to the context without aborting the request
		c.Error(fmt.Errorf("Invalid Input"))
		// Set the status code to 400
		c.Set("statusCode", http.StatusBadRequest)
	}

	// Validate the DTO using the validator instance
	if err := validate.Struct(dto); err != nil {
		// Append the validation error to the context without aborting the request
		c.Error(fmt.Errorf("Invalid Input"))

		// Set the status code to 400
		c.Set("statusCode", http.StatusBadRequest)
	}

	// Proceed to the next middleware or handler
	c.Next()
}
