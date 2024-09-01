package main

import (
	"db-tool/environments"
	"db-tool/internal/backup"
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

	http.HandleFunc("/", func(w http.ResponseWriter, r *http.Request) {
		w.Write([]byte("hello12sdfsafwq"))
	})

	//Start the server
	err := http.ListenAndServe(":"+os.Getenv("PORT"), nil)
	if err != nil {
		return
	}
}
