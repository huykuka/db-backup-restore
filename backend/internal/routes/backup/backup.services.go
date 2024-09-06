package backup

import "C"
import (
	"db-tool/internal/routes/histories"
	"db-tool/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

var backupRepository = new(BackUpRepository)
var historianRepository = new(histories.HistoriesRepository)

type BackupService struct{}

func (b *BackupService) backup(c *gin.Context) {
	handleError := func(err error, message string) {
		if err != nil {
			historianRepository.Create("failed")
			utils.HandleError(c, message, http.StatusBadRequest)
		}
	}

	// Backup the database
	filename, err := backupRepository.backup()
	if err != nil {
		handleError(err, "Backup failed!")
		return
	}

	// Save the backup record to database
	err = backupRepository.createBackUp(&filename)
	if err != nil {
		handleError(err, "Backup failed!")
		return
	}

	err = historianRepository.Create("success")
	if err != nil {
		return
	}

	c.Set("response", gin.H{
		"message": "Backup completed",
	})
}

func (b *BackupService) getBackupList(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryBackupDTO)
	backups, total, err := backupRepository.findMany(&query)
	if err != nil {
		utils.HandleError(c, "Can not retrieve Settings", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"backups": backups,
		"total":   total,
	})
}

func (b *BackupService) deleteBackUp(c *gin.Context) {
	id := c.Param("id")
	//Delete the backup record from database
	filename, err := backupRepository.delete(id)
	if err != nil {
		utils.HandleError(c, "Can not delete backup", http.StatusBadRequest)
		return
	}

	//Move the backup file to archive then using cron job to delete later
	backupRepository.moveBackUpFileToArchive(&filename)
	c.Set("response", gin.H{
		"messages": "Deleted backup successful",
	})
}

func (b *BackupService) bulkDeleteBackup(c *gin.Context) {
	ids := c.MustGet("Body").(BulkBackupDeleteDTO)

	//Delete the backup records from database
	filenames, err := backupRepository.bulkDelete(&ids.Ids)
	if err != nil {
		utils.HandleError(c, "Can not delete backups", http.StatusBadRequest)
		return
	}
	//Move the backup files to archive then using cron job to delete later
	for _, filename := range filenames {
		backupRepository.moveBackUpFileToArchive(&filename)
	}

	//Set response
	c.Set("response", gin.H{
		"message": "Deleted backups successful",
	})
}

func (b *BackupService) restoreBackup(c *gin.Context) {
	c.Set("response", gin.H{
		"message": "restore",
	})
}
