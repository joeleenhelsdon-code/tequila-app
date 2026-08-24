import { integer, sqliteTable, text } from "drizzle-orm/sqlite-core";

export const passportStates = sqliteTable("passport_states", {
  id: integer("id").primaryKey({ autoIncrement: true }),
  clientId: text("client_id").notNull().unique(),
  shelfJson: text("shelf_json").notNull().default("[]"),
  tastingsJson: text("tastings_json").notNull().default("[]"),
  updatedAt: text("updated_at").notNull(),
});
