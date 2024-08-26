#!/bin/bash

# Define the port to check
PORT=8081

# Find processes using the specified port
PIDS=$(lsof -ti:$PORT)

# Check if any process IDs were found
if [ -n "$PIDS" ]; then
    echo "Processes running on port $PORT:"

    # Loop through each process ID and print it
    for PID in $PIDS; do
        echo "Killing process $PID"
        # Kill the process
        kill -9 $PID
    done
    echo "All processes on port $PORT have been terminated."
else
    echo "No processes found on port $PORT."
fi
