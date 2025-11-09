import { drizzle } from 'drizzle-orm/postgres-js';
import postgres from 'postgres';
import { config } from '../config/index.js';
import * as schema from './schema.js';

// Create PostgreSQL connection
const connectionString = config.supabase.url.replace('https://', 'postgres://postgres:');

// For Supabase, we need to use the direct database URL
// Format: postgres://postgres:[YOUR-PASSWORD]@db.[PROJECT-REF].supabase.co:5432/postgres
const getDatabaseUrl = (): string => {
  // If SUPABASE_DB_URL is set, use it directly
  if (process.env.SUPABASE_DB_URL) {
    return process.env.SUPABASE_DB_URL;
  }

  // Otherwise, construct from SUPABASE_URL
  // This is a placeholder - users need to set SUPABASE_DB_URL in production
  throw new Error(
    'SUPABASE_DB_URL environment variable is required. ' +
    'Get it from Supabase Dashboard > Project Settings > Database > Connection String (URI)'
  );
};

// Create the connection
let dbUrl: string;
try {
  dbUrl = getDatabaseUrl();
} catch (error) {
  if (config.server.isDevelopment) {
    console.warn('⚠️  Database connection not configured. Some features will not work.');
    console.warn('   Set SUPABASE_DB_URL in your .env file to enable database features.');
    dbUrl = 'postgres://localhost:5432/postgres'; // Dummy URL for development
  } else {
    throw error;
  }
}

const client = postgres(dbUrl, {
  max: 10,
  idle_timeout: 20,
  connect_timeout: 10,
});

// Create Drizzle instance
export const db = drizzle(client, { schema });

// Helper function to test database connection
export async function testConnection(): Promise<boolean> {
  try {
    await client`SELECT 1`;
    return true;
  } catch (error) {
    console.error('Database connection failed:', error);
    return false;
  }
}
