#!/bin/bash


# Function to clean up processes on exit
cleanup() {
    echo "Cleaning up processes..."
    kill $(jobs -p)  # Kills all background processes started by the script
}

# Trap SIGINT (Ctrl+C) and SIGTERM to call the cleanup function
trap cleanup SIGINT SIGTERM

# Exit script if any command fails
set -e

# Backend setup
echo "Setting up the Django backend..."
pipenv install
pipenv run python manage.py makemigrations
pipenv run python manage.py migrate
echo "Django backend is set up. Starting the server..."
pipenv run python manage.py runserver &
DJANGO_PID=$!
echo "Django server is running on http://127.0.0.1:8000"

# Frontend setup
echo "Setting up the React frontend..."
cd team-member-react
source $NVM_DIR/nvm.sh || true  # Continue even if this command fails
if type nvm > /dev/null 2>&1; then
    nvm use 18 || true  # Continue even if this command fails
    echo "Using Node.js v18"
else
    echo "nvm is not installed, proceeding with the current node version"
fi
npm install
echo "React frontend is set up. Starting the app..."
npm start &
REACT_PID=$!
echo "React app is running on http://localhost:3000"

# Wait for processes to exit
wait $DJANGO_PID $REACT_PID

# Setup complete message will be shown before the cleanup if the script exits normally
echo "Setup complete."

# Calling cleanup in case of a normal script exit
cleanup