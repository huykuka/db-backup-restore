package histories

import (
	"bufio"
	"db-tool/internal/utils"
	"encoding/csv"
	"fmt"
	"io"
	"net/http"
	"time"

	"github.com/gin-gonic/gin"
)

type HistoriesService struct {
}

var historiesRepository = new(HistoriesRepository)

func (s *HistoriesService) getAll(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryHistorianDTO)
	statuses, total, err := historiesRepository.FindMany(&query)
	if err != nil {
		utils.HandleHTTPError(c, err.Error(), "Can not retrieve histories", http.StatusBadRequest)
		return
	}
	c.Set("response", gin.H{
		"statuses": statuses,
		"total":    total,
	})
}

func (s *HistoriesService) downloadCSV(c *gin.Context) {
	query, _ := c.MustGet("Query").(QueryHistorianDTO)
	// Define your chunk size and total number of records per query.
	const chunkSize = 50000
	var offset int
	var hasMoreData = true

	timestamp := time.Now().Format("20060102_150405") // YYYYMMDD_HHMMSS
	filename := fmt.Sprintf("log_%s.csv", timestamp)
	// Set headers for file downl
	c.Header("Access-Control-Expose-Headers", "Content-Disposition")
	c.Header("Content-Description", "File Transfer")
	c.Header("Content-Transfer-Encoding", "binary")
	c.Header("Content-Disposition", fmt.Sprintf("attachment; filename=%s", filename))
	c.Header("Content-Type", "text/csv")

	// Start streaming the CSV file to the client
	c.Stream(func(w io.Writer) bool {
		bufWriter := bufio.NewWriterSize(w, 65536) // 64KB buffer
		csvWriter := csv.NewWriter(w)
		if offset == 0 {
			// Write the CSV headers first
			csvWriter.Write([]string{"timestamp", "type", "status", "details"})
			csvWriter.Flush()
		}

		// While there's more data, query the next chunk
		for hasMoreData {
			// Query the next chunk from the database
			var chunkQuery = QueryHistorianDTO{
				Page: utils.Page{
					Size:   chunkSize,
					Number: offset,
				},
				Filter: query.Filter,
			}
			chunkQuery.Sort.Key = "created_at"
			chunkQuery.Sort.Order = "asc"

			rows, _, err := historiesRepository.FindMany(&chunkQuery)

			if err != nil {
				c.Status(http.StatusInternalServerError)
				return false
			}

			// If no more data, stop streaming
			if len(rows) == 0 {
				hasMoreData = false
				return false
			}

			records := make([][]string, 0, len(rows))
			for _, row := range rows {
				createdAt := row.CreatedAt.String()
				records = append(records, []string{createdAt, row.Type, row.Status, row.Detail})
			}

			csvWriter.WriteAll(records)
			if err := csvWriter.Error(); err != nil {
				c.Status(http.StatusInternalServerError)
				return false
			}

			offset++
		}
		csvWriter.Flush()
		bufWriter.Flush()
		return false // Stops the stream
	})
}
