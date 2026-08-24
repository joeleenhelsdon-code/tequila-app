import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const passportStates = sqliteTable("passport_states", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clientId: text("client_id").notNull().unique(),
  shelfJson: text("shelf_json").notNull().default("[]"),
  tastingsJson: text("tastings_json").notNull().default("[]"),
  updatedAt: text("updated_at").notNull(),
});

export const userConsents = sqliteTable("user_consents", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull().unique(),
  termsVersion: text("terms_version").notNull(),
  privacyVersion: text("privacy_version").notNull(),
  acceptedAt: text("accepted_at").notNull(),
  marketingOptIn: integer("marketing_opt_in", { mode: "boolean" }).notNull().default(false),
});

export const bottleSubmissions = sqliteTable("bottle_submissions", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  userId: text("user_id").notNull(),
  brand: text("brand").notNull(),
  expression: text("expression").notNull(),
  style: text("style").notNull(),
  abv: text("abv"),
  nom: text("nom"),
  notes: text("notes"),
  photoUrl: text("photo_url"),
  licenceVersion: text("licence_version").notNull(),
  licenceAcceptedAt: text("licence_accepted_at").notNull(),
  status: text("status").notNull().default("pending"),
  createdAt: text("created_at").notNull(),
});
