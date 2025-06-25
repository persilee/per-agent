import type { Config } from 'drizzle-kit'

if (!process.env.NUXT_POSTGRESQL_DATABASE_URL) {
  throw new Error('NUXT_POSTGRESQL_DATABASE_URL environment variable is not set')
}

export default {
  schema: './database/schema',
  out: './database/migrations',
  dialect: 'postgresql',
  dbCredentials: {
    url: process.env.NUXT_POSTGRESQL_DATABASE_URL,
  },
} satisfies Config
