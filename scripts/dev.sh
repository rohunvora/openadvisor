#!/bin/bash

# Development Environment Startup Script

echo "🚀 Starting OpenAdvisor Development Environment..."

# Check if Docker is running
if ! docker info > /dev/null 2>&1; then
  echo "❌ Docker is not running. Please start Docker Desktop."
  exit 1
fi

# Start Docker services
echo "🐳 Starting Docker services..."
docker-compose up -d

# Wait for services to be healthy
echo "⏳ Waiting for services to be ready..."
sleep 5

# Check service health
echo "🏥 Checking service health..."
docker-compose ps

# Install dependencies if needed
if [ ! -d "node_modules" ]; then
  echo "📦 Installing dependencies..."
  pnpm install
fi

# Start development servers
echo "🖥️  Starting development servers..."
echo ""
echo "📝 Services will be available at:"
echo "   Frontend:    http://localhost:3000"
echo "   API:         http://localhost:8080"
echo "   Adminer:     http://localhost:8081"
echo "   Bull Board:  http://localhost:3030"
echo ""

# Run in parallel with proper process management
pnpm dev 