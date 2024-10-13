package restore

import (
	"db-tool/internal/utils"
	"fmt"
	"log"
	"os"
	"path/filepath"
	"time"

	"github.com/gin-gonic/gin"
)

type RestoreService struct{}

var restoreRepository = new(RestoreRepository)

func (r *RestoreService) restore(c *gin.Context) {
	id := c.Param("id")
	err := restoreRepository.Restore(id)
	if err != nil {
		handleRestoreError(c, err, "Restore failed!")
		return
	}
	if err != nil {
		return
	}
	c.Set("response", gin.H{
		"message": "Restore completed",
	})
}

func (r *RestoreService) upload(c *gin.Context) {
	// Define the upload directory
	uploadDir := "upload"

	// Check if the directory exists
	if _, err := os.Stat(uploadDir); os.IsNotExist(err) {
		// Create the directory if it does not exist
		err := os.Mkdir(uploadDir, os.ModePerm)
		if err != nil {
			utils.HandleHTTPError(c, err.Error(), "Could not create upload directory", 500)
			return
		}
	}

	// Get the uploaded file
	file, err := c.FormFile("file")
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Invalid file", 400)
		return
	}

	// Create a unique filename by appending a timestamp
	uniqueFilename := fmt.Sprintf("%s_%s", time.Now().Format("20060102150405"), file.Filename)
	filePath := filepath.Join(uploadDir, uniqueFilename)

	// Save the uploaded file to the specified path
	if err := c.SaveUploadedFile(file, filePath); err != nil {
		utils.HandleHTTPError(c, err.Error(), "Could not save file", 500)
		return
	}
	log.Println(uniqueFilename + " has been uploaded!")
	// Set a response indicating success
	c.Set("response", gin.H{
		"message":  "File uploaded",
		"filename": uniqueFilename, // Optionally return the unique filename
	})
}

func handleRestoreError(c *gin.Context, err error, message string) {
	utils.HandleHTTPError(c, err.Error(), message)
}
