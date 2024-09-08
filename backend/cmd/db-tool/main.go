package main

import (
	"db-tool/internal/config"
	"db-tool/internal/cron"
	"db-tool/internal/routes"
	"sync"
)

func main() {
	config.Init()

	var wg sync.WaitGroup
	wg.Add(2)

	go func() {
		defer wg.Done()
		cron.Init()
	}()

	go func() {
		defer wg.Done()
		routes.Init()
	}()

	wg.Wait()
}
