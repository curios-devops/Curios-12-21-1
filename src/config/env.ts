// Environment variable validation and configuration
const requiredEnvVars = {
  VITE_SUPABASE_URL: import.meta.env.VITE_SUPABASE_URL,
  VITE_SUPABASE_ANON_KEY: import.meta.env.VITE_SUPABASE_ANON_KEY,
  VITE_OPENAI_API_KEY: import.meta.env.VITE_OPENAI_API_KEY,
} as const;

// Validate all required environment variables
Object.entries(requiredEnvVars).forEach(([key, value]) => {
  if (!value) {
    throw new Error(
      `Missing required environment variable: ${key}\n` +
      'Please check your .env file and ensure all required variables are set.'
    );
  }
});

export const env = {
  supabase: {
    url: requiredEnvVars.VITE_SUPABASE_URL,
    anonKey: requiredEnvVars.VITE_SUPABASE_ANON_KEY,
  },
  openai: {
    apiKey: requiredEnvVars.VITE_OPENAI_API_KEY,
  },
} as const;