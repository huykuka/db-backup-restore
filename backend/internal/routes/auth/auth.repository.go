package auth

import (
	"database/sql"
	"db-tool/internal/config/db"

	"golang.org/x/crypto/bcrypt"
)

type User db.User

type AuthRepository struct{}

func NewAuthRepository(db *sql.DB) *AuthRepository {
	return &AuthRepository{}
}

// func (r *AuthRepository) Login(ctx context.Context, email, password string) (*User, error) {
// 	user := &User{}
// 	err := database.QueryRowContext(ctx, "SELECT id, email, password FROM users WHERE email = ?", email).
// 		Scan(&user.ID, &user.Email, &user.Password)
// 	if err != nil {
// 		if err == sql.ErrNoRows {
// 			return nil, errors.New("user not found")
// 		}
// 		return nil, err
// 	}

// 	if err := bcrypt.CompareHashAndPassword([]byte(user.Password), []byte(password)); err != nil {
// 		return nil, errors.New("invalid password")
// 	}

// 	return user, nil
// }

// func (r *AuthRepository) Logout(ctx context.Context, userID int64) error {
// 	// In a real-world scenario, you might invalidate the user's session token here
// 	// For this example, we'll just log the logout action
// 	_, err := r.db.ExecContext(ctx, "INSERT INTO user_logs (user_id, action, timestamp) VALUES (?, 'logout', ?)", userID, time.Now())
// 	return err
// }

func (r *AuthRepository) HashPassword(password string) (string, error) {
	hashedPassword, err := bcrypt.GenerateFromPassword([]byte(password), bcrypt.DefaultCost)
	if err != nil {
		return "", err
	}
	return string(hashedPassword), nil
}

func (r *AuthRepository) ComparePasswords(hashedPassword, password string) error {
	return bcrypt.CompareHashAndPassword([]byte(hashedPassword), []byte(password))
}

// func (r *AuthRepository) ChangePassword(ctx context.Context, userID int64, newPassword string) error {
// 	hashedPassword, err := r.HashPassword(newPassword)
// 	if err != nil {
// 		return err
// 	}

// 	_, err = r.db.ExecContext(ctx, "UPDATE users SET password = ? WHERE id = ?", hashedPassword, userID)
// 	return err
// }
