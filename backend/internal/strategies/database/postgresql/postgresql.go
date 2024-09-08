package postgresql

import (
	"db-tool/internal/routes/settings"
	"fmt"
	log "github.com/sirupsen/logrus"
	"os"
	"os/exec"
	"time"
)

const (
	dbName = "postgres"
)

type PostgreSQL struct{}

func (p *PostgreSQL) BackUp(dbSetting *settings.DBSetting) (filename string, err error) {
	backupFile := fmt.Sprintf("%s/%s_%s_%s.sql", dbSetting.BackUpDir, time.Now().Format("20060102150405"), dbSetting.DbName, dbName)
	if err := os.MkdirAll(dbSetting.BackUpDir, 0755); err != nil && !os.IsExist(err) {
		log.Printf("Failed to create backup directory: %v\n", err)
		return "", err
	}
	if err := os.Setenv("PGPASSWORD", dbSetting.Password); err != nil {
		return "", err
	}

	//Execute Restore command
	cmd := exec.Command("pg_dump", "-U", dbSetting.User, "-h", dbSetting.Host, "-p", dbSetting.Port, "-F", "c", "-b", "-v", "-f", backupFile, dbSetting.DbName)
	cmd.Stdout, cmd.Stderr = os.Stdout, os.Stderr

	if err := cmd.Run(); err != nil {
		log.Printf("Backup failed: %v\n", err)
		return "", err
	}

	log.Printf("Backup completed: %s\n", backupFile)
	return backupFile, nil
}

func (p *PostgreSQL) Restore(dbSetting *settings.DBSetting, filename *string) error {

	if err := os.Setenv("PGPASSWORD", dbSetting.Password); err != nil {
		return err
	}
	//Execute Restore command
	cmd := exec.Command("pg_restore", "-U", dbSetting.User, "-h", dbSetting.Host, "-p", dbSetting.Port, "-d", dbSetting.DbName, "-v", *filename)
	cmd.Stdout, cmd.Stderr = os.Stdout, os.Stderr

	if err := cmd.Run(); err != nil {
		log.Printf("Restore failed: %v\n", err)
		return err
	}

	log.Printf("Restore completed: %s\n", *filename)
	return nil
}
