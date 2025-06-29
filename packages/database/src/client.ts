import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import * as schema from './schema';

// Database connection URL from environment
const DATABASE_URL = process.env.DATABASE_URL;

if (!DATABASE_URL) {
  throw new Error('DATABASE_URL environment variable is required');
}

// Create postgres connection
const queryClient = postgres(DATABASE_URL);

// Create drizzle instance with schema
export const db = drizzle(queryClient, { schema });

// Export for migrations
export const migrationClient = queryClient; 