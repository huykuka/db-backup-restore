package backup

import "C"
import (
	"db-tool/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

var backupRepository = new(BackUpRepository)

type BackupService struct{}

func (b *BackupService) backup(c *gin.Context) {
	filename, err := backupRepository.backup()
	if err != nil {
		utils.HandleError(c, "Backup failed!", http.StatusBadRequest)
		return
	}
	err = backupRepository.createBackUp(filename)

	if err != nil {
		utils.HandleError(c, "Backup failed!", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"message": "Backup completed",
	})
}

func (b *BackupService) getBackupList(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryBackup)
	backups, err := backupRepository.findMany(&query)
	if err != nil {
		utils.HandleError(c, "Can not retrieve Settings", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"backups": backups,
	})
}

func (b *BackupService) deleteBackUp(c *gin.Context) {
	id := c.Param("id")
	err := backupRepository.delete(id)
	if err != nil {
		utils.HandleError(c, "Can not delete backup", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"messages": "Deleted backup successful",
	})

}
func (b *BackupService) restoreBackup(c *gin.Context) {
	c.Set("response", gin.H{
		"message": "restore",
	})
}
