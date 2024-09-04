package interceptors

import (
	"github.com/gin-gonic/gin"
	"net/http"
)

type JSONAPIResponse struct {
	JSONAPI struct {
		Version string `json:"version"`
	} `json:"jsonapi"`
	Meta   map[string]interface{} `json:"meta,omitempty"`
	Links  map[string]string      `json:"links,omitempty"`
	Data   interface{}            `json:"data,omitempty"`
	Errors []JSONAPIError         `json:"errors,omitempty"`
}

type JSONAPIError struct {
	Status string `json:"status"`
	Title  string `json:"title"`
	Detail string `json:"detail,omitempty"`
}

func JsonApiInterceptor() gin.HandlerFunc {
	return func(c *gin.Context) {
		c.Next()
		// Initialize the JSON API response
		jsonApiResponse := JSONAPIResponse{
			Meta:  make(map[string]interface{}),
			Links: make(map[string]string),
		}
		jsonApiResponse.JSONAPI.Version = "1.1"
		jsonApiResponse.Links["self"] = c.Request.URL.String()

		// Handle errors
		if len(c.Errors) > 0 {
			// Retrieve the status code from the context, defaulting to 400 if not set
			statusCode := http.StatusBadRequest
			if code, exists := c.Get("statusCode"); exists {
				statusCode = code.(int)
			}

			errors := make([]JSONAPIError, len(c.Errors))
			for i, e := range c.Errors {
				errors[i] = JSONAPIError{
					Status: http.StatusText(statusCode),
					Title:  e.Error(),
				}
			}
			jsonApiResponse.Errors = errors

			// Set the status code and send the JSON:API formatted error response
			c.JSON(statusCode, jsonApiResponse)
			return
		}

		// Handle successful responses for GET requests
		if c.Request.Method == http.MethodGet {
			if page, exists := c.GetQuery("page[number]"); exists {
				jsonApiResponse.Meta["page"] = page
			}
			if size, exists := c.GetQuery("page[size]"); exists {
				jsonApiResponse.Meta["size"] = size
			}
			if sortField, exists := c.GetQuery("sort[field]"); exists {
				jsonApiResponse.Meta["sort"] = sortField
			}
			if sortOrder, exists := c.GetQuery("sort[order]"); exists {
				jsonApiResponse.Meta["order"] = sortOrder
			}
		}

		// Get the actual response data
		responseData, exists := c.Get("response")
		if exists {
			jsonApiResponse.Data = responseData
			if dataList, ok := responseData.([]interface{}); ok {
				jsonApiResponse.Meta["total"] = len(dataList)
			}
		}

		// Replace the original response with the JSON-API formatted response
		c.JSON(c.Writer.Status(), jsonApiResponse)
	}
}
