package interceptors

import (
	"github.com/gin-gonic/gin"
	"github.com/stretchr/testify/assert"
	"net/http"
	"net/http/httptest"
	"strconv"
	"testing"
)

func TestJsonApiInterceptor(t *testing.T) {

}

func TestHandleError(t *testing.T) {
	gin.SetMode(gin.TestMode)
	tests := []struct {
		name       string
		statusCode string
		error      string
	}{
		{
			name:       "Should return 401 error",
			statusCode: "401",
			error:      "Throttle limit exceed",
		},
		{
			name:       "Should return 404 error",
			statusCode: "404",
			error:      "Not found",
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			w := httptest.NewRecorder()
			c, _ := gin.CreateTestContext(w)
			c.Set("error", tt.error)
			c.Set("statusCode", tt.statusCode)
			errorResponse, _ := handleError(c, tt.error)

			// Convert statusCode to int and then to http.StatusText
			statusCodeInt, err := strconv.Atoi(tt.statusCode)
			if err != nil {
				t.Fatalf("invalid status code: %v", err)
			}
			expectedStatusText := http.StatusText(statusCodeInt)

			assert.Equal(t, tt.error, errorResponse.Title)
			assert.Equal(t, expectedStatusText, errorResponse.Status)
		})
	}
}

func TestHandleForSuccess(t *testing.T) {

}

func TestHandleForGetMetadata(t *testing.T) {

}
