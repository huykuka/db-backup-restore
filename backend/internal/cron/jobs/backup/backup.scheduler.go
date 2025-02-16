package backup

import (
	"github.com/go-co-op/gocron/v2"
	log "github.com/sirupsen/logrus"
	"time"
)

var backUpTask = new(BackUpTask)

func Init() {
	// create a scheduler
	s, err := gocron.NewScheduler()
	if err != nil {
		// handle error
		log.Error("Can not create backup scheduler")
	}

	// add a job to the scheduler
	j, err := s.NewJob(
		gocron.DurationJob(
			60*time.Minute,
		),

		gocron.NewTask(
			func() {
				backUpTask.Run()
			},
		),
	)
	// start the scheduler
	log.Printf("Backup job with ID %d has been started...", j.ID())
	s.Start()
}
