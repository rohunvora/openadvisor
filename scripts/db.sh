#!/bin/bash

# Database Management Script

command=${1:-help}

case $command in
  "studio")
    echo "🎨 Opening Drizzle Studio..."
    cd packages/database && pnpm db:studio
    ;;
  
  "push")
    echo "📤 Pushing schema to database..."
    cd packages/database && pnpm db:push
    ;;
  
  "generate")
    echo "🔨 Generating migrations..."
    cd packages/database && pnpm db:generate
    ;;
  
  "migrate")
    echo "🚀 Running migrations..."
    cd packages/database && pnpm db:migrate
    ;;
  
  "reset")
    echo "⚠️  This will reset your database. Are you sure? (y/N)"
    read -r response
    if [[ "$response" =~ ^([yY][eE][sS]|[yY])$ ]]; then
      echo "🔄 Resetting database..."
      # Drop all tables and recreate
      cd packages/database && pnpm db:push --force
    else
      echo "❌ Reset cancelled."
    fi
    ;;
  
  "seed")
    echo "🌱 Seeding database with test data..."
    cd packages/database && pnpm tsx src/seed.ts
    ;;
  
  *)
    echo "📚 Database Management Commands:"
    echo ""
    echo "  ./scripts/db.sh studio    - Open Drizzle Studio (GUI)"
    echo "  ./scripts/db.sh push      - Push schema changes to database"
    echo "  ./scripts/db.sh generate  - Generate migration files"
    echo "  ./scripts/db.sh migrate   - Run pending migrations"
    echo "  ./scripts/db.sh reset     - Reset database (careful!)"
    echo "  ./scripts/db.sh seed      - Seed with test data"
    echo ""
    ;;
esac 