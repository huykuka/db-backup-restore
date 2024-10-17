package postgresql

import (
	"bytes"
	"db-tool/internal/routes/settings"
	"fmt"
	"os"
	"os/exec"
	"strings"
	"time"

	log "github.com/sirupsen/logrus"
)

const (
	dbName = "postgres"
)

type PostgreSQL struct{}

func (p *PostgreSQL) BackUp(dbSetting *settings.DBSetting) (string, error) {

	//Must return tar format as it uses pg_dump
	backupFile := fmt.Sprintf("%s/%s_%s_%s.tar", dbSetting.BackUpDir, time.Now().Format("20060102150405"), dbSetting.DbName, dbName)
	if err := os.MkdirAll(dbSetting.BackUpDir, 0755); err != nil && !os.IsExist(err) {
		return "", fmt.Errorf("failed to create backup directory: %v", err)
	}
	if err := os.Setenv("PGPASSWORD", dbSetting.Password); err != nil {
		return "", fmt.Errorf("failed to set PGPASSWORD: %v", err)
	}

	cmd := exec.Command("pg_dump", "-U", dbSetting.User, "-h", dbSetting.Host, "-p", dbSetting.Port, "-F", "c", "-b", "-v", "-f", backupFile, dbSetting.DbName)
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		errMsg := stderr.String()
		return "", fmt.Errorf("backup failed: %v\nError details: %s", err, errMsg)
	}

	log.Printf("Backup completed: %s", backupFile)
	return backupFile, nil
}

func (p *PostgreSQL) Restore(dbSetting *settings.DBSetting, filename *string) error {
	// Set the PGPASSWORD environment variable
	if err := os.Setenv("PGPASSWORD", dbSetting.Password); err != nil {
		return fmt.Errorf("failed to set PGPASSWORD: %v", err)
	}

	var cmd *exec.Cmd
	// Switch between psql and pg_restore based on the file extension
	if strings.HasSuffix(*filename, ".sql") {
		// Use psql for plain SQL files
		cmd = exec.Command("psql", "-U", dbSetting.User, "-h", dbSetting.Host, "-p", dbSetting.Port, "-d", dbSetting.DbName, "-f", *filename)
	} else {
		// Use pg_restore for other formats (e.g., custom, tar, directory)
		cmd = exec.Command("pg_restore", "-U", dbSetting.User, "-h", dbSetting.Host, "-p", dbSetting.Port, "-d", dbSetting.DbName, "-v", *filename)
	}

	var stdoutBuf, stderrBuf bytes.Buffer
	cmd.Stdout = &stdoutBuf
	cmd.Stderr = &stderrBuf

	// Measure execution time
	startTime := time.Now()
	err := cmd.Run()
	duration := time.Since(startTime)

	// Capture output and errors
	stdoutStr := stdoutBuf.String()
	stderrStr := stderrBuf.String()

	// Format output for logging
	output := fmt.Sprintf("Execution time: %v\n\nstdout:\n%s\n\nstderr:\n%s", duration, stdoutStr, stderrStr)

	// Check for errors
	if err != nil {
		return fmt.Errorf("restore failed: %v\nError details: %s", err, stderrStr)
	}

	log.Printf("Restore completed successfully. %s", output)
	return nil
}

func (p *PostgreSQL) HealthCheck(dbSetting *settings.DBSetting) error {
	if err := os.Setenv("PGPASSWORD", dbSetting.Password); err != nil {
		return fmt.Errorf("failed to set PGPASSWORD: %v", err)
	}

	cmd := exec.Command("pg_isready", "-U", dbSetting.User, "-h", dbSetting.Host, "-p", dbSetting.Port, "-d", dbSetting.DbName)
	var stderr bytes.Buffer
	cmd.Stderr = &stderr

	if err := cmd.Run(); err != nil {
		errMsg := stderr.String()
		return fmt.Errorf("health check failed: %v\nError details: %s", err, errMsg)
	}

	log.Printf("Health check completed for: %s", dbSetting.DbName)
	return nil
}
