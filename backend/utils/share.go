package utils

import (
	"github.com/gin-gonic/gin"
	log "github.com/sirupsen/logrus"
	"gorm.io/gorm"
)

func HandleHTTPError(c *gin.Context, errMsg string, details string, statusCode int) {
	log.WithFields(log.Fields{}).Error(errMsg)
	c.Set("error", details)
	c.AbortWithStatus(statusCode)
}

type Pageable interface {
	GetPage() Page
}

func CreatePaging[T Pageable](qr *gorm.DB, query T) {
	page := query.GetPage()
	if page.Size > 0 {
		if page.Number > 0 {
			offset := (page.Number - 1) * page.Size
			qr = qr.Offset(offset).Limit(page.Size)
		} else {
			qr = qr.Limit(page.Size)
		}
	}
}
