import { pgTable, varchar, numeric, text } from 'drizzle-orm/pg-core'

export const startups = pgTable('startups', {
  id: varchar('id', { length: 191 })
    .primaryKey()
    .$defaultFn(() => nanoid()),
  name: varchar('name', { length: 255 }).notNull(),
  description: text('description').notNull(),
  founder: varchar('founder', { length: 255 }),
  revenue: numeric('revenue', { precision: 15, scale: 2 }),
})

export type Startup = typeof startups.$inferSelect
