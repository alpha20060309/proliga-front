import { config } from 'dotenv';
import { defineConfig } from 'drizzle-kit';

config({ path: '.env' });

export default defineConfig({
  schema: './src/lib/db/schema.js',
  out: './supabase/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    // eslint-disable-next-line no-undef
    url: process.env.NEXT_PUBLIC_DATABASE_URL,
  },
});
