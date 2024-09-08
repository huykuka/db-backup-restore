package backup

import (
	"github.com/go-co-op/gocron/v2"
	"time"
)

var backUpTask = new(BackUpTask)

func Init() {
	// create a scheduler
	s, err := gocron.NewScheduler()
	if err != nil {
		// handle error
	}

	// add a job to the scheduler
	_, err = s.NewJob(
		gocron.DurationJob(
			20*time.Minute,
		),

		gocron.NewTask(
			func() {
				backUpTask.Run()
			},
		),
	)

	// start the scheduler
	s.Start()
}
