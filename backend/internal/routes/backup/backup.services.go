package backup

import "C"
import (
	"db-tool/internal/routes/histories"
	"db-tool/internal/utils"
	"fmt"
	"github.com/gin-gonic/gin"
	"net/http"
	"os"
	"path/filepath"
)

var backupRepository = new(BackUpRepository)
var historianRepository = new(histories.HistoriesRepository)

type BackupService struct{}

func (b *BackupService) backup(c *gin.Context) {
	HandleHTTPError := func(err error, message string) {
		if err != nil {
			err := historianRepository.Create(&histories.History{
				Status: "failed",
				Type:   "backup",
			})
			if err != nil {
				return
			}
			utils.HandleHTTPError(c, err.Error(), message, http.StatusBadRequest)
		}
	}

	// Backup the database
	filename, err := backupRepository.Backup()
	if err != nil {
		HandleHTTPError(err, "Backup failed!")
		return
	}

	// Save the backup record to database
	err = backupRepository.CreateBackUp(&filename)
	if err != nil {
		HandleHTTPError(err, "Backup failed!")
		return
	}

	err = historianRepository.Create(&histories.History{
		Status: "success",
		Type:   "backup",
	})
	if err != nil {
		return
	}

	c.Set("response", gin.H{
		"message": "Backup completed",
	})
}

func (b *BackupService) getBackupList(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryBackupDTO)
	backups, total, err := backupRepository.FindMany(&query)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not retrieve Backups", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"backups": backups,
		"total":   total,
	})
}

func (b *BackupService) downloadBackUpFile(c *gin.Context) {
	id := c.Param("id")
	backup, err := backupRepository.FindOne(id)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not retrieve backup", http.StatusBadRequest)
		return
	}

	// Format CreatedAt timestamp as part of the filename
	path := backup.Filename
	filename := filepath.Base(path)
	fileInfo, _ := os.Stat(path)
	// Set the appropriate headers
	c.Header("Access-Control-Expose-Headers", "Content-Disposition")
	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filename))
	c.Header("Content-Type", "application/octet-stream")
	c.Header("Content-Transfer-Encoding", "binary")
	c.Header("Content-Length", fmt.Sprintf("%d", fileInfo.Size()))

	// Send the file
	c.File(path)
}

func (b *BackupService) deleteBackUp(c *gin.Context) {
	id := c.Param("id")
	if id == "" {
		utils.HandleHTTPError(c, "ID is required", "Can not delete backup", http.StatusBadRequest)
		return
	}

	//Delete the backup record from database
	filename, err := backupRepository.Delete(id)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not delete backup", http.StatusBadRequest)
		return
	}

	//Move the backup file to archive then using cron job to delete later
	backupRepository.MoveBackUpFileToArchive(&filename)
	c.Set("response", gin.H{
		"messages": "Deleted backup successful",
	})
}

func (b *BackupService) bulkDeleteBackup(c *gin.Context) {
	ids := c.MustGet("Body").(BulkBackupDeleteDTO)

	//Delete the backup records from database
	filenames, err := backupRepository.BulkDelete(&ids.Ids)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not delete backups", http.StatusBadRequest)
		return
	}
	//Move the backup files to archive then using cron job to delete later
	for _, filename := range filenames {
		backupRepository.MoveBackUpFileToArchive(&filename)
	}

	//Set response
	c.Set("response", gin.H{
		"message": "Deleted backups successful",
	})
}
