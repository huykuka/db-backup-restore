package services

import "golang.org/x/crypto/bcrypt"

func HashPassword(password string) string {
	bcryptPassword, _ := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	return string(bcryptPassword)
}
