package backup

import (
	"db-tool/utils"
	"github.com/gin-gonic/gin"
	"net/http"
)

var backupRepository = new(BackUpRepository)

type BackupService struct{}

func (b *BackupService) backup(c *gin.Context) {
	err := backupRepository.backup()
	if err != nil {
		utils.HandleError(c, "Backup failed!", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"message": "Backup completed",
	})
}

func (b *BackupService) getBackupList(c *gin.Context) {
	c.Set("response", gin.H{
		"message": "list",
	})
}

func (b *BackupService) restoreBackup(c *gin.Context) {
	c.Set("response", gin.H{
		"message": "restore",
	})
}
