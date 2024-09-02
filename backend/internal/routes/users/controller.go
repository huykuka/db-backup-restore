package user

import (
	"github.com/gorilla/mux"
)

func Serve(r *mux.Router) {
	r.HandleFunc("/users", getAll).Methods("GET")
	r.HandleFunc("/users/{id}", getByID).Methods("GET")
	r.HandleFunc("/users", create).Methods("POST")
}
