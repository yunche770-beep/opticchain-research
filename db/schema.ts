// Intentionally empty by default.
// Add Drizzle tables here when the site actually needs a database.
// See examples/d1/db/schema.ts for an opt-in example.
import { integer, sqliteTable, text, index } from 'drizzle-orm/sqlite-core';
export const records = sqliteTable('research_records', {
 id:text('id').primaryKey(), workspace:text('workspace').notNull(), kind:text('kind').notNull(),
 payload:text('payload').notNull(), status:text('status').notNull(), createdAt:text('created_at').notNull(),
},t=>[index('idx_research_workspace_time').on(t.workspace,t.createdAt)]);
export const rateLimits=sqliteTable('research_rate_limits',{key:text('key').primaryKey(),count:integer('count').notNull()});
