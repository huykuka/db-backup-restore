package users

type CreateUserDTO struct {
	Name string `json:"name" validate:"required,min=3,max=100"`
	Age  int    `json:"age" validate:"required,min=3,max=150"`
}

type UpdateUserDTO struct {
	Name string `json:"name,omitempty" validate:"omitempty,min=3,max=32"`
	Age  int    `json:"age,omitempty" validate:"omitempty,min=3,max=32"`
}
