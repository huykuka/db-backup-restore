package main

import (
	"db-tool/config/api"
	"db-tool/config/environments"
)

func main() {
	environments.SetupEnvironments()
	api.ServeEndPoints()
}
