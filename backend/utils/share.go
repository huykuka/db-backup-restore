package utils

import (
	"github.com/gin-gonic/gin"
	"github.com/pkg/errors"
	"gorm.io/gorm"
)

func HandleError(c *gin.Context, errMsg string, statusCode int) {
	c.Error(errors.New(errMsg))
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
