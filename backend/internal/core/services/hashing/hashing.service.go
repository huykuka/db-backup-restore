package hashing

import (
	"crypto/hmac"
	"crypto/sha256"
	"encoding/hex"
	"errors"
)

type HashingService struct {
	key []byte
}

func NewPasswordService(key string) *HashingService {
	return &HashingService{key: []byte(key)}
}

func (s *HashingService) HashPassword(password string) (string, error) {
	h := hmac.New(sha256.New, s.key)
	h.Write([]byte(password))
	return hex.EncodeToString(h.Sum(nil)), nil
}

func (s *HashingService) ComparePasswords(hashedPassword, password string) error {
	newHash, err := s.HashPassword(password)
	if err != nil {
		return err
	}
	if newHash != hashedPassword {
		return errors.New("invalid password")
	}
	return nil
}
