import { pgTable, text, serial, integer, timestamp } from "drizzle-orm/pg-core";
import { createInsertSchema, createSelectSchema } from "drizzle-zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  username: text("username").unique().notNull(),
  password: text("password").notNull(),
  token: text("token"),
  createdAt: timestamp("created_at").defaultNow(),
});

export const animals = pgTable("animals", {
  id: serial("id").primaryKey(),
  name: text("name").notNull(),
  species: text("species").notNull(),
  age: integer("age").notNull(),
  diet: text("diet").notNull(),
  health: text("health").notNull(),
  habitat: text("habitat").notNull(),
  description: text("description"),
  imageUrl: text("image_url"),
  createdAt: timestamp("created_at").defaultNow(),
  updatedAt: timestamp("updated_at").defaultNow(),
});

export const insertUserSchema = createInsertSchema(users);
export const selectUserSchema = createSelectSchema(users);
export const insertAnimalSchema = createInsertSchema(animals);
export const selectAnimalSchema = createSelectSchema(animals);

export type User = typeof users.$inferSelect;
export type InsertUser = typeof users.$inferInsert;
export type Animal = typeof animals.$inferSelect;
export type InsertAnimal = typeof animals.$inferInsert;
