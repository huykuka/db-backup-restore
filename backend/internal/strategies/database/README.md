# Database type Strategy

Adding a New Database Type Strategy
To add a new database type strategy to your project, follow these steps:
## Overview
1. Define the New Database Strategy
   Create a new file for your database strategy implementation. For example, if you are adding a strategy for SQLite, 
   create a file sqlite.go in the appropriate directory (e.g., backend/internal/strategies/database/sqlite).

    ```go
    type PostgreSQL struct{}

    func (p *PostgreSQL) BackUp(dbSetting *settings.DBSetting) (filename string, err error) {
        .....implementation here
        return backupFile, nil
    }

    func (p *PostgreSQL) Restore(dbSetting *settings.DBSetting, filename *string) error {

        .....implementation here
        log.Printf("Restore completed: %s\n", *filename)
        return nil
    }

2. Register the New Strategy
   Update the dbStrategies map to include the new database strategy. This map is typically defined in a central location where all 
   strategies are registered.
    ```go
    var dbStrategies = map[string]DBType{
        "postgresql": &postgresql.PostgreSQL{},
        "mysql":      &mysql.MySQL{},
    }
