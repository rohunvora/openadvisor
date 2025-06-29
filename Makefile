.PHONY: help dev stop install clean build test lint db-studio db-push docker-up docker-down

# Default target
help:
	@echo "OpenAdvisor Development Commands:"
	@echo ""
	@echo "  make dev          - Start development environment"
	@echo "  make stop         - Stop development environment"
	@echo "  make install      - Install dependencies"
	@echo "  make clean        - Clean build artifacts"
	@echo "  make build        - Build all packages"
	@echo "  make test         - Run tests"
	@echo "  make lint         - Run linters"
	@echo "  make db-studio    - Open database GUI"
	@echo "  make db-push      - Push schema to database"
	@echo "  make docker-up    - Start Docker services"
	@echo "  make docker-down  - Stop Docker services"

# Development
dev: docker-up
	@echo "🚀 Starting development servers..."
	pnpm dev

stop: docker-down
	@echo "✅ Development environment stopped"

# Dependencies
install:
	@echo "📦 Installing dependencies..."
	pnpm install

clean:
	@echo "🧹 Cleaning build artifacts..."
	pnpm clean
	rm -rf node_modules .next dist

# Building
build:
	@echo "🔨 Building all packages..."
	pnpm build

# Testing
test:
	@echo "🧪 Running tests..."
	pnpm test

lint:
	@echo "🔍 Running linters..."
	pnpm lint

# Database
db-studio:
	@echo "🎨 Opening database studio..."
	cd packages/database && pnpm db:studio

db-push:
	@echo "📤 Pushing schema to database..."
	cd packages/database && pnpm db:push

# Docker
docker-up:
	@echo "🐳 Starting Docker services..."
	docker-compose up -d

docker-down:
	@echo "🐳 Stopping Docker services..."
	docker-compose down

# Quick setup for new developers
setup: install docker-up db-push
	@echo "✅ Development environment ready!"
	@echo "Run 'make dev' to start coding" 