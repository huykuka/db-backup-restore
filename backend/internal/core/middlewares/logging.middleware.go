package middlewares

import (
	"log"
	"net/http"
)

func LoggingMiddleware(next http.Handler) http.Handler {
	return http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {
		// Log client information
		clientIP := r.RemoteAddr
		userAgent := r.UserAgent()
		requestMethod := r.Method
		requestURI := r.RequestURI

		log.Printf("Client IP: %s, User Agent: %s, Method: %s, URI: %s", clientIP, userAgent, requestMethod, requestURI)

		// Call the next handler, which can be another middleware in the chain, or the final handler.
		next.ServeHTTP(w, r)
	})
}
