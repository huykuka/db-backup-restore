package mysql

import (
	"bytes"
	"db-tool/internal/routes/settings"
	"fmt"
	"os"
	"os/exec"
	"time"

	log "github.com/sirupsen/logrus"
)

const (
	dbName = "mysql"
)

type MySQL struct{}

func (m *MySQL) BackUp(dbSetting *settings.DBSetting) (string, error) {
	backupFile := fmt.Sprintf("%s/%s_%s_%s.sql", dbSetting.BackUpDir, time.Now().Format("20060102150405"), dbSetting.DbName, dbName)
	if err := os.MkdirAll(dbSetting.BackUpDir, 0755); err != nil && !os.IsExist(err) {
		return "", fmt.Errorf("failed to create backup directory: %v", err)
	}
	if err := os.Setenv("MYSQL_PWD", dbSetting.Password); err != nil {
		return "", fmt.Errorf("failed to set MYSQL_PWD: %v", err)
	}

	cmd := exec.Command("mysqldump", "-u", dbSetting.User, "-h", dbSetting.Host, "-P", dbSetting.Port, dbSetting.DbName, "-r", backupFile)
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		errMsg := stderr.String()
		return "", fmt.Errorf("backup failed: %v\nError details: %s", err, errMsg)
	}

	log.Printf("Backup completed: %s", backupFile)
	return backupFile, nil
}

func (m *MySQL) Restore(dbSetting *settings.DBSetting, filename *string) error {
	if err := os.Setenv("MYSQL_PWD", dbSetting.Password); err != nil {
		return fmt.Errorf("failed to set MYSQL_PWD: %v", err)
	}

	cmd := exec.Command("mysql", "-u", dbSetting.User, "-h", dbSetting.Host, "-P", dbSetting.Port, dbSetting.DbName, "-e", "source "+*filename)
	var stdoutBuf, stderrBuf bytes.Buffer
	cmd.Stdout = &stdoutBuf
	cmd.Stderr = &stderrBuf

	startTime := time.Now()
	err := cmd.Run()
	duration := time.Since(startTime)

	stdoutStr := stdoutBuf.String()
	stderrStr := stderrBuf.String()

	output := fmt.Sprintf("Execution time: %v\n\nstdout:\n%s\n\nstderr:\n%s", duration, stdoutStr, stderrStr)

	if err != nil {
		return fmt.Errorf("restore failed: %v\nError details: %s\n%s", err, output)
	}

	log.Printf("Restore completed successfully. %s", output)
	return nil
}

func (m *MySQL) HealthCheck(dbSetting *settings.DBSetting) error {
	if err := os.Setenv("MYSQL_PWD", dbSetting.Password); err != nil {
		return fmt.Errorf("failed to set MYSQL_PWD: %v", err)
	}

	// Note: MySQL doesn't have a direct equivalent to pg_isready. We'll use mysqladmin ping instead.
	cmd := exec.Command("mysqladmin", "ping", "-u", dbSetting.User, "-h", dbSetting.Host, "-P", dbSetting.Port)
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		errMsg := stderr.String()
		return fmt.Errorf("health check failed: %v\nError details: %s", err, errMsg)
	}

	log.Printf("Health check completed for: %s", dbSetting.DbName)
	return nil
}
