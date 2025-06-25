import { pgTable, varchar } from 'drizzle-orm/pg-core'

export const startups = pgTable('startups', {
  id: varchar('id', { length: 255 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar('name', { length: 255 }).notNull(),
  description: varchar('description', { length: 1000 }).notNull(),
})

export type Startup = typeof startups.$inferSelect
