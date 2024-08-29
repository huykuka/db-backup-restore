package environments

import (
	"fmt"
	"github.com/joho/godotenv"
	"os"
)

func SetupEnvironments() {
	//Setup the environment
	env := os.Getenv("ENV")
	fmt.Print(env)
	if env == "" {
		env = "dev"
	}

	if env == "dev" {
		err := godotenv.Load("./environments/.env." + env)
		if err != nil {
			return
		}
	}
}
