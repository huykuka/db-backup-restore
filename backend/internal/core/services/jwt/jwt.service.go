package jwt

import (
	"os"
	"sync"
	"time"

	log "github.com/sirupsen/logrus"

	"github.com/golang-jwt/jwt"
)

type JWTService struct {
	JWTKey []byte
}

var (
	instance *JWTService
	once     sync.Once
)

func NewJWTService() *JWTService {
	//singleton service
	once.Do(func() {
		instance = &JWTService{
			JWTKey: []byte(os.Getenv("HASH_JWT_KEY")),
		}
	})
	return instance
}

func (j *JWTService) GenerateAccessToken(email string) (string, error) {
	token := jwt.NewWithClaims(jwt.SigningMethodHS256,
		jwt.MapClaims{
			"username": email,
			"exp":      time.Now().Add(time.Hour * 24).Unix(),
		})

	tokenString, err := token.SignedString(instance.JWTKey)
	if err != nil {
		log.Error(err)
		return "", err
	}
	return tokenString, nil
}
