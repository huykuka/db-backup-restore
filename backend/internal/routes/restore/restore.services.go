package restore

import (
	"db-tool/internal/utils"
	"os"

	"github.com/gin-gonic/gin"
)

type RestoreService struct{}

var UploadDir = "upload"
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

func (r *RestoreService) manualRestore(c *gin.Context) {
	path := c.MustGet("Body").(ManualRestoreDTO).FilePath
	err := restoreRepository.manualRestore(&path)
	if err != nil {
		handleRestoreError(c, err, "Restore failed!")
		return
	}
	c.Set("response", gin.H{
		"message": "Restore completed",
	})
}

func (r *RestoreService) upload(c *gin.Context) {

	// Check if the directory exists
	if _, err := os.Stat(UploadDir); os.IsNotExist(err) {
		// Create the directory if it does not exist
		err := os.Mkdir(UploadDir, os.ModePerm)
		if err != nil {
			utils.HandleHTTPError(c, err.Error(), "Could not create upload directory", 500)
			return
		}
	}

	filename, err := restoreRepository.SaveFile(c)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Could not save file")
		return
	}
	// Set a response indicating success
	c.Set("response", gin.H{
		"message":  "File uploaded",
		"fileName": filename,
	})
}

func handleRestoreError(c *gin.Context, err error, message string) {
	utils.HandleHTTPError(c, err.Error(), message)
}
