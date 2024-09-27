import { defineConfig } from "drizzle-kit";

export default defineConfig({
  schema: "./src/db/schema",
  out: "./drizzle",
  dialect: "sqlite",
  verbose: true,
  strict: true,
  dbCredentials: {
    url: "file:./sqlite.db",
  },
});
