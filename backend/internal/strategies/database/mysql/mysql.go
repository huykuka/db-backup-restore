package mysql

import (
	"db-tool/internal/routes/settings"
	"fmt"
	log "github.com/sirupsen/logrus"
	"os"
	"os/exec"
	"time"
)

const (
	dbName = "mysql"
)

type MySQL struct{}

func (m *MySQL) BackUp(dbSetting *settings.DBSetting) (filename string, err error) {
	backupFile := fmt.Sprintf("%s/%s_%s_%s.sql", dbSetting.BackUpDir, time.Now().Format("20060102150405"), dbSetting.DbName, dbName)
	if err := os.MkdirAll(dbSetting.BackUpDir, 0755); err != nil && !os.IsExist(err) {
		log.Printf("Failed to create backup directory: %v\n", err)
		return "", err
	}
	if err := os.Setenv("MYSQL_PWD", dbSetting.Password); err != nil {
		return "", err
	}

	cmd := exec.Command("mysqldump", "-u", dbSetting.User, "-h", dbSetting.Host, "-P", dbSetting.Port, dbSetting.DbName, "-r", backupFile)
	cmd.Stdout, cmd.Stderr = os.Stdout, os.Stderr

	if err := cmd.Run(); err != nil {
		log.Printf("Backup failed: %v\n", err)
		return "", err
	}

	log.Printf("Backup completed: %s\n", backupFile)
	return backupFile, nil
}

func (m *MySQL) Restore(dbSetting *settings.DBSetting, filename *string) error {
	if err := os.Setenv("MYSQL_PWD", dbSetting.Password); err != nil {
		return err
	}

	cmd := exec.Command("mysql", "-u", dbSetting.User, "-h", dbSetting.Host, "-P", dbSetting.Port, dbSetting.DbName, "-e", "source "+*filename)
	cmd.Stdout, cmd.Stderr = os.Stdout, os.Stderr

	if err := cmd.Run(); err != nil {
		log.Printf("Restore failed: %v\n", err)
		return err
	}

	log.Printf("Restore completed: %s\n", *filename)
	return nil
}

func (m *MySQL) HealthCheck(dbSetting *settings.DBSetting) error {
	if err := os.Setenv("MYSQL_PWD", dbSetting.Password); err != nil {
		return err
	}

	//Execute Restore command
	cmd := exec.Command("mysql_isready", "-U", dbSetting.User, "-h", dbSetting.Host, "-p", dbSetting.Port, "-d", dbSetting.DbName)
	cmd.Stdout, cmd.Stderr = os.Stdout, os.Stderr

	if err := cmd.Run(); err != nil {
		log.Printf("Health check failed: %v\n", err)
		return err
	}

	log.Printf("Health check completed: %s\n", dbSetting.DbName)
	return nil
}
