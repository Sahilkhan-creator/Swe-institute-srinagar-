import { sql } from "drizzle-orm";
import { pgTable, text, varchar, serial, timestamp, integer } from "drizzle-orm/pg-core";
import { createInsertSchema } from "drizzle-zod";
import { z } from "zod";

export const users = pgTable("users", {
  id: serial("id").primaryKey(),
  studentCode: varchar("student_code", { length: 10 }).notNull().unique(),
  createdAt: timestamp("created_at").defaultNow().notNull(),
});

export const unlockedClasses = pgTable("unlocked_classes", {
  id: serial("id").primaryKey(),
  userId: integer("user_id").notNull().references(() => users.id),
  classId: varchar("class_id", { length: 2 }).notNull(),
  unlockedAt: timestamp("unlocked_at").defaultNow().notNull(),
});

export const notes = pgTable("notes", {
  id: serial("id").primaryKey(),
  classId: varchar("class_id", { length: 2 }).notNull(),
  subject: text("subject").notNull(),
  title: text("title").notNull(),
  description: text("description"),
  price: integer("price").notNull().default(40),
  fileUrl: text("file_url"),
});

export const insertUserSchema = createInsertSchema(users).omit({
  id: true,
  createdAt: true,
});

export const insertUnlockedClassSchema = createInsertSchema(unlockedClasses).omit({
  id: true,
  unlockedAt: true,
});

export const insertNoteSchema = createInsertSchema(notes).omit({
  id: true,
});

export type InsertUser = z.infer<typeof insertUserSchema>;
export type User = typeof users.$inferSelect;
export type UnlockedClass = typeof unlockedClasses.$inferSelect;
export type Note = typeof notes.$inferSelect;
export type InsertUnlockedClass = z.infer<typeof insertUnlockedClassSchema>;
export type InsertNote = z.infer<typeof insertNoteSchema>;
