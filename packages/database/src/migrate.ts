import { createClient } from '@supabase/supabase-js';
import * as fs from 'fs';
import * as path from 'path';
import * as dotenv from 'dotenv';

// Load environment variables
dotenv.config({ path: '../../.env' });

async function runMigrations() {
  const supabaseUrl = process.env.SUPABASE_URL;
  const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY;

  if (!supabaseUrl || !supabaseServiceKey) {
    throw new Error('Missing Supabase environment variables');
  }

  const supabase = createClient(supabaseUrl, supabaseServiceKey);

  // Read migration files
  const migrationsDir = path.join(__dirname, '../supabase/migrations');
  const files = fs.readdirSync(migrationsDir).sort();

  console.log(`Found ${files.length} migration files`);

  for (const file of files) {
    if (file.endsWith('.sql')) {
      console.log(`Running migration: ${file}`);
      const sql = fs.readFileSync(path.join(migrationsDir, file), 'utf8');
      
      try {
        // Execute the SQL
        const { error } = await supabase.from('_migrations').select('*').limit(1);
        // This is just to test connection, actual migration runs via direct SQL
        
        // For now, we'll need to run migrations manually via Supabase dashboard
        console.log(`Migration ${file} needs to be run manually in Supabase dashboard`);
      } catch (error) {
        console.error(`Failed to run migration ${file}:`, error);
      }
    }
  }

  console.log('Migration check complete');
}

runMigrations().catch(console.error); 