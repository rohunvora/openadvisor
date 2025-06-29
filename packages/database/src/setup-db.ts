import { createClient } from '@supabase/supabase-js';
import * as dotenv from 'dotenv';
import path from 'path';

// Load environment variables
dotenv.config({ path: path.join(__dirname, '../../../.env') });

const supabaseUrl = process.env.SUPABASE_URL!;
const supabaseServiceKey = process.env.SUPABASE_SERVICE_ROLE_KEY!;

// Create Supabase client with service role key for admin access
const supabase = createClient(supabaseUrl, supabaseServiceKey, {
  auth: {
    persistSession: false,
  },
});

async function setupDatabase() {
  console.log('🔄 Setting up database schema...');
  
  try {
    // Read the generated SQL migration
    const fs = await import('fs/promises');
    const migrationPath = path.join(__dirname, '../drizzle/0000_ordinary_mentallo.sql');
    const sqlContent = await fs.readFile(migrationPath, 'utf-8');
    
    // Split by statement-breakpoint and execute each statement
    const statements = sqlContent.split('--> statement-breakpoint').filter(s => s.trim());
    
    for (let i = 0; i < statements.length; i++) {
      const statement = statements[i].trim();
      if (statement) {
        console.log(`Executing statement ${i + 1}/${statements.length}...`);
        const { error } = await supabase.rpc('exec_sql', { sql: statement });
        if (error) {
          console.error(`Error in statement ${i + 1}:`, error);
          throw error;
        }
      }
    }
    
    console.log('✅ Database schema created successfully!');
  } catch (error) {
    console.error('❌ Setup failed:', error);
    process.exit(1);
  }
}

// Run if called directly
if (require.main === module) {
  setupDatabase();
} 