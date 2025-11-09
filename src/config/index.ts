import dotenv from 'dotenv';
import { z } from 'zod';

// Load environment variables
dotenv.config();

// Environment validation schema
const envSchema = z.object({
  // Server
  PORT: z.string().default('3000'),
  NODE_ENV: z.enum(['development', 'production', 'test']).default('development'),

  // LINE Bot
  LINE_CHANNEL_SECRET: z.string().min(1, 'LINE_CHANNEL_SECRET is required'),
  LINE_CHANNEL_ACCESS_TOKEN: z.string().min(1, 'LINE_CHANNEL_ACCESS_TOKEN is required'),

  // Supabase
  SUPABASE_URL: z.string().url('SUPABASE_URL must be a valid URL'),
  SUPABASE_ANON_KEY: z.string().min(1, 'SUPABASE_ANON_KEY is required'),
  SUPABASE_SERVICE_KEY: z.string().optional(),

  // Redis (optional for now)
  UPSTASH_REDIS_URL: z.string().optional(),
  UPSTASH_REDIS_TOKEN: z.string().optional(),

  // Google Drive (optional for Phase 1)
  GOOGLE_SERVICE_ACCOUNT_EMAIL: z.string().optional(),
  GOOGLE_PRIVATE_KEY: z.string().optional(),
  GOOGLE_DRIVE_FOLDER_ID: z.string().optional(),

  // OpenAI (optional for Phase 1)
  OPENAI_API_KEY: z.string().optional(),

  // Pinecone (optional for Phase 1)
  PINECONE_API_KEY: z.string().optional(),
  PINECONE_ENVIRONMENT: z.string().optional(),
  PINECONE_INDEX_NAME: z.string().optional(),

  // Bot Configuration
  MAX_FILE_SIZE: z.string().default('52428800'), // 50MB
  SUPPORTED_FILE_TYPES: z.string().default('image,video,audio,file'),
  ADMIN_USER_IDS: z.string().optional(),
  BOT_LANGUAGE: z.enum(['en', 'th']).default('th'),
});

// Parse and validate environment variables
const parseEnv = () => {
  try {
    return envSchema.parse(process.env);
  } catch (error) {
    if (error instanceof z.ZodError) {
      console.error('❌ Environment validation failed:');
      error.errors.forEach((err) => {
        console.error(`  - ${err.path.join('.')}: ${err.message}`);
      });
      process.exit(1);
    }
    throw error;
  }
};

const env = parseEnv();

// Export typed configuration
export const config = {
  server: {
    port: parseInt(env.PORT, 10),
    nodeEnv: env.NODE_ENV,
    isDevelopment: env.NODE_ENV === 'development',
    isProduction: env.NODE_ENV === 'production',
  },

  line: {
    channelSecret: env.LINE_CHANNEL_SECRET,
    channelAccessToken: env.LINE_CHANNEL_ACCESS_TOKEN,
  },

  supabase: {
    url: env.SUPABASE_URL,
    anonKey: env.SUPABASE_ANON_KEY,
    serviceKey: env.SUPABASE_SERVICE_KEY,
  },

  redis: {
    url: env.UPSTASH_REDIS_URL,
    token: env.UPSTASH_REDIS_TOKEN,
  },

  googleDrive: {
    serviceAccountEmail: env.GOOGLE_SERVICE_ACCOUNT_EMAIL,
    privateKey: env.GOOGLE_PRIVATE_KEY?.replace(/\\n/g, '\n'),
    folderId: env.GOOGLE_DRIVE_FOLDER_ID,
  },

  openai: {
    apiKey: env.OPENAI_API_KEY,
  },

  pinecone: {
    apiKey: env.PINECONE_API_KEY,
    environment: env.PINECONE_ENVIRONMENT,
    indexName: env.PINECONE_INDEX_NAME,
  },

  bot: {
    maxFileSize: parseInt(env.MAX_FILE_SIZE, 10),
    supportedFileTypes: env.SUPPORTED_FILE_TYPES.split(',').map((t) => t.trim()),
    adminUserIds: env.ADMIN_USER_IDS?.split(',').map((id) => id.trim()) || [],
    language: env.BOT_LANGUAGE,
  },
} as const;

// Helper to check if optional features are configured
export const features = {
  hasRedis: Boolean(config.redis.url && config.redis.token),
  hasGoogleDrive: Boolean(
    config.googleDrive.serviceAccountEmail &&
    config.googleDrive.privateKey &&
    config.googleDrive.folderId
  ),
  hasOpenAI: Boolean(config.openai.apiKey),
  hasPinecone: Boolean(
    config.pinecone.apiKey &&
    config.pinecone.environment &&
    config.pinecone.indexName
  ),
} as const;
