package histories

import (
	"db-tool/internal/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"io"
	"net/http"
	"os"
)

type HistoriesService struct {
}

var historiesRepository = new(HistoriesRepository)

func (s *HistoriesService) getAll(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryHistorianDTO)
	statuses, total, err := historiesRepository.FindMany(&query)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not retrieve histories", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"statuses": statuses,
		"total":    total,
	})
}

func (s *HistoriesService) download(c *gin.Context) {
	filePath := "/app/sample/IMG_7490.MOV"
	// Set the path to your video directory

	// Open the file
	file, err := os.Open(filePath)
	if err != nil {
		c.String(http.StatusNotFound, "File not found")
		return
	}
	defer file.Close()

	// Get file info
	fileInfo, err := file.Stat()
	if err != nil {
		c.String(http.StatusInternalServerError, "Failed to get file info")
		return
	}

	// Set headers for file download
	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Transfer-Encoding", "binary")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", "IMG_7490.MOV"))
	c.Header("Content-Type", "application/octet-stream")
	c.Header("Content-Length", fmt.Sprintf("%d", fileInfo.Size()))

	// Stream the file to the client
	c.Stream(func(w io.Writer) bool {
		// Use a buffer for copying
		buffer := make([]byte, 1024*1024) // 1MB buffer
		_, err := io.CopyBuffer(w, file, buffer)
		if err != nil {
			// Handle any errors during streaming
			c.Status(http.StatusInternalServerError)
			return false
		}
		return false
	})
}
