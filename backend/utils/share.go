package utils

import (
	"fmt"
	"github.com/gin-gonic/gin"
	"gorm.io/gorm"
)

func HandleError(c *gin.Context, errMsg string, statusCode int) {
	c.Error(fmt.Errorf(errMsg))
	c.Set("statusCode", statusCode)
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
