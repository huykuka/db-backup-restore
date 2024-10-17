package auth

import (
	"db-tool/internal/config/db"
	"db-tool/internal/core/services/hashing"
	"db-tool/internal/routes/users"

	log "github.com/sirupsen/logrus"
)

type User db.User

type AuthRepository struct{}

var hashingService = hashing.NewHashingService()
var userRepository = new(users.UserRepository)

func (r *AuthRepository) Login(userDto *LoginDTO) error {
	user, err := userRepository.FindOne(userDto.Email)
	if err != nil {
		log.Error(err.Error())
		return err
	}

	// Compare the hashed password with the provided password.
	err = hashingService.ComparePasswords(user.Password, userDto.Password) // Ensure you compare the hashed password
	if err != nil {
		log.Error(err.Error())
		return err
	}

	// Log the successful login event
	log.Infof("User with email %s has logged in successfully.", user.Email)

	return nil
}
