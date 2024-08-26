package main

import (
	"fmt"
	"net/http"
	"os"
)

func main() {
	//Read the environment variables
	port := os.Getenv("PORT")

	///Frontend serve
	fs := http.FileServer(http.Dir("static/"))
	http.Handle("/", fs)

	//Serve API
	http.HandleFunc("/api", func(w http.ResponseWriter, r *http.Request) {
		_, err := fmt.Fprintf(w, "Hello World")
		if err != nil {
			return
		}
	})

	fmt.Printf("Server is running on port %s\n", port)
	err := http.ListenAndServe(":"+port, nil)
	if err != nil {
		return
	}
}
