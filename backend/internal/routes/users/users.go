package user

import (
	"github.com/gin-gonic/gin"
	"github.com/go-playground/validator/v10"
	"net/http"
)

type User struct {
	ID   string `json:"id" validate:"required,uuid4"`
	Name string `json:"name" validate:"required,min=3,max=32"`
	Age  int    `json:"age" validate:"required,min=3,max=32"`
}

type CreateUserDTO struct {
	Name string `json:"name" validate:"required,min=3,max=32"`
	Age  int    `json:"age" validate:"required,min=3,max=32"`
}

type UpdateUserDTO struct {
	Name string `json:"name,omitempty" validate:"required,min=3,max=32"`
	Age  int    `json:"age,omitempty" validate:"required,min=3,max=32"`
}

var validate = validator.New()

func (u *User) getAll(c *gin.Context) {
	c.JSON(200, gin.H{
		"message": "pong",
	})
}

func (u *User) getByID(c *gin.Context) {
	id := c.Param("id")
	c.JSON(http.StatusOK, gin.H{
		"id": id,
	})
}

func (u *User) create(c *gin.Context) {
	var user User

	// Bind JSON body to struct
	if err := c.ShouldBindJSON(&user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// Validate struct fields
	if err := validate.Struct(user); err != nil {
		c.JSON(http.StatusBadRequest, gin.H{"error": err.Error()})
		return
	}

	// If validation passes
	c.JSON(http.StatusOK, gin.H{"message": "User created successfully"})
}
