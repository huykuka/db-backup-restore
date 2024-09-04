package main

import (
	"db-tool/internal/api"
	"db-tool/internal/config"
)

func main() {
	config.Init()

	api.Init()
}
