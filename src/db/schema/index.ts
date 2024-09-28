import { sql } from "drizzle-orm";
import { text, integer, sqliteTable } from "drizzle-orm/sqlite-core";
import { createId } from "@paralleldrive/cuid2";

export const user = sqliteTable("user", {
  id: text("id").primaryKey().$defaultFn(createId),
  username: text("username").notNull(),
  password: text("password").notNull(),
  email: text("email").notNull(),
  bio: text("bio"),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
  // image: text("image"),
  // roleId
});

export const sessions = sqliteTable("sessions", {
  id: text("id").primaryKey().$defaultFn(createId),
  userId: text("user_id"),

  sessionToken: text("session_token").notNull(), // JWT or other session token
  tokenVersion: integer("token_version").notNull(),

  lastSeen: integer("last_seen"),
  deviceType: text("device_type", {
    enum: ["web", "android", "ios", "desktop"],
  }).default("android"),
  country: text("country"),
  timezone: text("timezone"),
  fcmToken: text("fcm_token"),
  deviceToken: text("device_token"),
  osVersion: text("os_version"),
  ipAddress: text("ip_address"),
  userAgent: text("user_agent"),
  expiresAt: integer("expires_at"),
  active: integer("active").default(1),
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const authProviders = sqliteTable("auth_providers", {
  id: text("id").primaryKey().$defaultFn(createId),
  userId: text("user_id").notNull(),
  provider: text("provider").notNull(),
  providerId: text("provider_id").notNull(),
  providerUserId: text("provider_user_id").notNull(), // User ID from provider
  accessToken: text("access_token").notNull(),
  refreshToken: text("refresh_token"),
  accessTokenExpiresAt: integer("access_token_expires_at").notNull(),
  refreshTokenExpiresAt: integer("refresh_token_expires_at"),
  expiresIn: integer("expires_in"), // Token expiry time
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const userAuth = sqliteTable("user_auth", {
  id: text("id").primaryKey().$defaultFn(createId),
  userId: text("user_id").notNull(),
  providerId: integer("provider_id")
    .references(() => authProviders.id)
    .notNull(),
  providerUserId: text("provider_user_id").notNull(), // User ID from provider
  accessToken: text("access_token"), // OAuth access token
  refreshToken: text("refresh_token"), // OAuth refresh token
  expiresIn: integer("expires_in"), // Token expiry time
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});

export const userRoles = sqliteTable("user_roles", {
  id: text("id").primaryKey().$defaultFn(createId),
  name: text("name").notNull().unique(),
  permissions: integer("permissions").notNull(),
  // users
  createdAt: text("created_at")
    .default(sql`CURRENT_TIMESTAMP`)
    .notNull(),
});
