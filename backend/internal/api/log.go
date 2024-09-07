package api

import (
	log "github.com/sirupsen/logrus"

	"os"
)

// Need to put the logrus config here so the api can understand the log config
func init() {
	// Use the Airbrake hook to report errors that have Error severity or above to
	// an exception tracker. You can create custom hooks, see the Hooks section.
	log.SetFormatter(&log.TextFormatter{
		FullTimestamp:    true, // Enables full timestamps
		DisableTimestamp: false,
		PadLevelText:     true,
	})

	// Log to stdout for now to verify output
	log.SetOutput(os.Stdout)
}
