package main

import (
	"db-tool/environments"
	"db-tool/modules/backup"
	"fmt"
	"net/http"
	"os"
)

func main() {

	environments.SetupEnvironments()

	//Serving the backup endpoint
	http.HandleFunc("/backup", func(w http.ResponseWriter, r *http.Request) {
		fmt.Printf("Backup requested\n")
		backup.BackUpDatabase()
		w.Write([]byte("Backup completed"))
	})

	//Start the server
	err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)
	if err != nil {
		return
	}
}
