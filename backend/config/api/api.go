package api

import (
	user "db-tool/internal/routes/users"
	"fmt"
	"github.com/gin-gonic/gin"
	"os"
)

func ServeEndPoints() {
	port := os.Getenv("PORT")
	//Setup GIN
	r := gin.Default()

	//Serving static

	//

	//Serving API
	var api = r.Group("/api")

	//Register modules
	user.Serve(api)
	////

	fmt.Println("Server is running on port: ", port)

	err := r.Run(":" + port)
	if err != nil {
		return
	}

}
