package restore

import "fmt"

type RestoreRepository struct{}

func (r *RestoreRepository) restore(backupId string) error {
	// Restore the backup
	//Find the backup with the given id then restore it
	fmt.Println("Restoring the backup with id: ", backupId)
	return nil
}
