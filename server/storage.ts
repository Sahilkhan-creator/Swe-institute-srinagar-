import { db } from "./db";
import { users, unlockedClasses, notes, type User, type InsertUser, type UnlockedClass, type InsertUnlockedClass, type Note, type InsertNote } from "@shared/schema";
import { eq, and } from "drizzle-orm";

export interface IStorage {
  // User methods
  getUserByStudentCode(studentCode: string): Promise<User | undefined>;
  createUser(user: InsertUser): Promise<User>;
  
  // Unlocked classes methods
  getUnlockedClasses(userId: number): Promise<UnlockedClass[]>;
  isClassUnlocked(userId: number, classId: string): Promise<boolean>;
  unlockClass(unlock: InsertUnlockedClass): Promise<UnlockedClass>;
  
  // Notes methods
  getNotesByClass(classId: string): Promise<Note[]>;
  getAllNotes(): Promise<Note[]>;
  createNote(note: InsertNote): Promise<Note>;
}

export class DbStorage implements IStorage {
  async getUserByStudentCode(studentCode: string): Promise<User | undefined> {
    const result = await db.select().from(users).where(eq(users.studentCode, studentCode)).limit(1);
    return result[0];
  }

  async createUser(insertUser: InsertUser): Promise<User> {
    const result = await db.insert(users).values(insertUser).returning();
    return result[0];
  }

  async getUnlockedClasses(userId: number): Promise<UnlockedClass[]> {
    return await db.select().from(unlockedClasses).where(eq(unlockedClasses.userId, userId));
  }

  async isClassUnlocked(userId: number, classId: string): Promise<boolean> {
    const result = await db
      .select()
      .from(unlockedClasses)
      .where(and(eq(unlockedClasses.userId, userId), eq(unlockedClasses.classId, classId)))
      .limit(1);
    return result.length > 0;
  }

  async unlockClass(unlock: InsertUnlockedClass): Promise<UnlockedClass> {
    const result = await db.insert(unlockedClasses).values(unlock).returning();
    return result[0];
  }

  async getNotesByClass(classId: string): Promise<Note[]> {
    return await db.select().from(notes).where(eq(notes.classId, classId));
  }

  async getAllNotes(): Promise<Note[]> {
    return await db.select().from(notes);
  }

  async createNote(note: InsertNote): Promise<Note> {
    const result = await db.insert(notes).values(note).returning();
    return result[0];
  }
}

export const storage = new DbStorage();
