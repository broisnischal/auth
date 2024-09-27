import {
  sqliteTable,
  AnySQLiteColumn,
  text,
  integer,
} from "drizzle-orm/sqlite-core";
import { sql } from "drizzle-orm";

export const users = sqliteTable("users", {
  id: text("id"),
  textModifiers: text("text_modifiers")
    .default("sql`(CURRENT_TIMESTAMP)`")
    .notNull(),
  intModifiers: integer("int_modifiers").default(0).notNull(),
});
