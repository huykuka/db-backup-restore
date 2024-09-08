package log

import (
	rotatelogs "github.com/lestrrat-go/file-rotatelogs"
	"github.com/rifflock/lfshook"
	log "github.com/sirupsen/logrus"
	"os"
	"time"
)

func Init() {
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp:    true, // Enables full timestamps
		DisableTimestamp: false,
		PadLevelText:     true,
	})

	path := "/var/log/go.log"

	writer, _ := rotatelogs.New(
		path+".%Y%m%d%H%M",
		rotatelogs.WithLinkName(path),
		rotatelogs.WithMaxAge(time.Duration(86400)*time.Second),
		rotatelogs.WithRotationTime(time.Duration(604800)*time.Second),
	)

	log.AddHook(lfshook.NewHook(
		lfshook.WriterMap{
			log.InfoLevel:  writer,
			log.ErrorLevel: writer,
		},
		&log.JSONFormatter{},
	))

	// Log to stdout for now to verify output
	log.SetOutput(os.Stdout)
}
