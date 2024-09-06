package api

import (
	"github.com/sirupsen/logrus"
)

func initLogger() *logrus.Logger {
	log := logrus.New()

	// Create a log file
	//file, err := os.OpenFile("app.log", os.O_CREATE|os.O_WRONLY|os.O_APPEND, 0666)
	//if err != nil {
	//	log.Fatalf("Failed to open log file: %v", err)
	//}
	//
	//// Set the output of the logger to both the file and stdout
	//log.SetOutput(io.MultiWriter(file, os.Stdout))
	//log.SetOutput(file)
	return log
}
