package cron

import "db-tool/internal/jobs/backup"

func Init() {
	backup.Init()
}
