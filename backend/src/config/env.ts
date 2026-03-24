export const validateEnv = () => {
  const required = ['SUPABASE_URL', 'SUPABASE_ANON_KEY']

  for (const key of required) {
    if (!process.env[key]) {
      throw new Error(`Missing required env var: ${key}`)
    }
  }
}

export const env = {
  port: process.env.PORT,
  frontendUrl: process.env.FRONTEND_URL,
  supabaseUrl: process.env.SUPABASE_URL!,
  supabaseKey: process.env.SUPABASE_ANON_KEY!,
  jwtSecret: process.env.JWT_SECRET!,
}