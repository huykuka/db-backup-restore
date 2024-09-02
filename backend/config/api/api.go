package api

import (
	user "db-tool/internal/routes/users"
	"github.com/gorilla/mux"
	"net/http"
	"os"
)

func ServeEndPoints() {
	//Setup Mux
	r := mux.NewRouter()

	//Serving static

	//

	//Serving API
	var api = r.PathPrefix("/api").Subrouter()
	api.NotFoundHandler = http.HandlerFunc(func(w http.ResponseWriter, r *http.Request) {})

	//Register modules
	user.Serve(api)
	////

	//Start the server
	err := http.ListenAndServe(":"+os.Getenv("PORT"), r)
	if err != nil {
		return
	}
}
