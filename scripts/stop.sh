#!/bin/bash

# Stop Development Environment

echo "🛑 Stopping OpenAdvisor Development Environment..."

# Stop Docker services
echo "🐳 Stopping Docker services..."
docker-compose down

# Kill any running node processes on our ports
echo "🔍 Checking for lingering processes..."
lsof -ti:3000 | xargs kill -9 2>/dev/null || true
lsof -ti:8080 | xargs kill -9 2>/dev/null || true

echo "✅ Development environment stopped." 