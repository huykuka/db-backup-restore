package user

type CreateUserDTO struct {
	Name string `json:"name" validate:"required,min=3,max=32"`
	Age  int    `json:"age" validate:"required,min=3,max=32"`
}

type UpdateUserDTO struct {
	Name string `json:"name,omitempty" validate:"required,min=3,max=32"`
	Age  int    `json:"age,omitempty" validate:"required,min=3,max=32"`
}
