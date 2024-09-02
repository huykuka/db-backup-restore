package user

import (
	"encoding/json"
	"fmt"
	"github.com/go-playground/validator/v10"
	"github.com/gorilla/mux"
	"net/http"
)

type User struct {
	ID   string `json:"id" validate:"required,uuid4"`
	Name string `json:"name" validate:"required,min=3,max=32"`
}

var validate *validator.Validate

func getAll(w http.ResponseWriter, r *http.Request) {
	_, err := w.Write([]byte("Hello1af"))
	if err != nil {
		return
	}
}

func getByID(w http.ResponseWriter, r *http.Request) {
	vars := mux.Vars(r)
	id := vars["id"]
	fmt.Println(id)
	_, err := w.Write([]byte(id))
	if err != nil {
		return
	}
}

func create(w http.ResponseWriter, r *http.Request) {
	var user User
	err := json.NewDecoder(r.Body).Decode(&user)
	if err != nil {
		http.Error(w, err.Error(), http.StatusBadRequest)
		return
	}
	// Process the user data (e.g., save to database)
	_, err = w.Write([]byte("User created: " + user.Name))
	if err != nil {
		http.Error(w, err.Error(), http.StatusInternalServerError)
		return
	}
}
