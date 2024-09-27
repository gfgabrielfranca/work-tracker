import { integer, sqliteTable, text } from 'drizzle-orm/sqlite-core';

export const works = sqliteTable('works', {
  id: integer('id', { mode: 'number' }).primaryKey({ autoIncrement: true }),
  title: text('title').notNull(),
  startDate: integer('start_date', { mode: 'timestamp' }).notNull(),
  endDate: integer('end_date', { mode: 'timestamp' }),
});
