package cron

import "db-tool/internal/cron/jobs/backup"

func Init() {
	backup.Init()
}
