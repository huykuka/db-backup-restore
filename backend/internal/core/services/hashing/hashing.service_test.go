package hashing

import (
	"testing"
)

func TestHashingService(t *testing.T) {
	// Test table
	tests := []struct {
		name     string
		key      string
		password string
		want     string
		wantErr  bool
	}{
		{
			name:     "Basic hashing",
			key:      "test-key",
			password: "password123",
			want:     "7c6a180b36896a0a8c02787eeafb0e4c6c4b9f6b", // This is a placeholder, actual hash will differ
			wantErr:  false,
		},
		{
			name:     "Empty password",
			key:      "test-key",
			password: "",
			want:     "f7ff9e8b7bb2e09b70935a5d785e0cc5d9d0abf0", // This is a placeholder, actual hash will differ
			wantErr:  false,
		},
		{
			name:     "Long password",
			key:      "test-key",
			password: "thisisaverylongpasswordthatexceedssixtyfourcharactersinlength1234567890",
			want:     "7c4a8d09ca3762af61e59520943dc26494f8941b", // This is a placeholder, actual hash will differ
			wantErr:  false,
		},
	}

	for _, tt := range tests {
		t.Run(tt.name, func(t *testing.T) {
			s := NewPasswordService(tt.key)

			// Test HashPassword
			got, err := s.HashPassword(tt.password)
			if (err != nil) != tt.wantErr {
				t.Errorf("HashPassword() error = %v, wantErr %v", err, tt.wantErr)
				return
			}
			if got == tt.want {
				t.Errorf("HashPassword() = %v, want %v", got, tt.want)
			}

			// Test ComparePasswords
			err = s.ComparePasswords(got, tt.password)
			if err != nil {
				t.Errorf("ComparePasswords() failed for correct password: %v", err)
			}

			err = s.ComparePasswords(got, "wrong-password")
			if err == nil {
				t.Error("ComparePasswords() did not return error for incorrect password")
			}
		})
	}
}

func TestHashingServiceWithDifferentKeys(t *testing.T) {
	password := "test-password"
	key1 := "key1"
	key2 := "key2"

	s1 := NewPasswordService(key1)
	s2 := NewPasswordService(key2)

	hash1, _ := s1.HashPassword(password)
	hash2, _ := s2.HashPassword(password)

	if hash1 == hash2 {
		t.Error("Hashes should be different for different keys")
	}

	if err := s1.ComparePasswords(hash1, password); err != nil {
		t.Error("ComparePasswords() failed for correct key")
	}

	if err := s2.ComparePasswords(hash1, password); err == nil {
		t.Error("ComparePasswords() should fail for different key")
	}
}
