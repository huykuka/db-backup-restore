package di

import "db-tool/internal/routes/users"

type DependencyHandler struct {
	UserService *users.Service
}

var Handler *DependencyHandler

func Init() {
	Handler = &DependencyHandler{
		UserService: new(users.Service),
	}
}
