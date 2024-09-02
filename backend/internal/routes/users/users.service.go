package user

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
)

type User struct {
	ID   string `json:"id" validate:"required,uuid4"`
	Name string `json:"name" validate:"required,min=3,max=32"`
}

var validate *validator.Validate

func getAll(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func getByID(c *gin.Context) {
	//vars := mux.Vars(r)
	//id := vars["id"]
	//fmt.Println(id)
	//_, err := w.Write([]byte(id))
	//if err != nil {
	//	return
	//}
}

func create(c *gin.Context) {
	//var user User
	//err := json.NewDecoder(r.Body).Decode(&user)
	//if err != nil {
	//	http.Error(w, err.Error(), http.StatusBadRequest)
	//	return
	//}
	//// Process the user data (e.g., save to database)
	//_, err = w.Write([]byte("User created: " + user.Name))
	//if err != nil {
	//	http.Error(w, err.Error(), http.StatusInternalServerError)
	//	return
	//}
}
