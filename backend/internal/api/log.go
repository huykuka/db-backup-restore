package api

import (
	"fmt"
	"github.com/sirupsen/logrus"
	"github.com/sirupsen/logrus/hooks/writer"
	"os"
)

func initLogger() *logrus.Logger {
	log := logrus.New()
	//log.SetOutput(ioutil.Discard) // Send all logs to nowhere by default

	log.AddHook(&writer.Hook{ // Send colored format to stdout
		Writer: os.Stdout,
	})

	logFile, err := os.OpenFile("logs.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	if err != nil {
		panic(fmt.Sprintf("[Error]: %s", err))
	}

	log.AddHook(&writer.Hook{ // Send uncolored format to file
		Writer: logFile,
		LogLevels: []logrus.Level{
			logrus.InfoLevel,
		},
	})

	return log
}
