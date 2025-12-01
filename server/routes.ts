import type { Express } from "express";
import { createServer, type Server } from "http";
import { storage } from "./storage";
import { insertUserSchema, insertUnlockedClassSchema } from "@shared/schema";
import { z } from "zod";

export async function registerRoutes(
  httpServer: Server,
  app: Express
): Promise<Server> {
  
  // Verify student code and get/create user
  app.post("/api/auth/verify-code", async (req, res) => {
    try {
      const { studentCode } = req.body;
      
      if (!studentCode || studentCode !== "9876") {
        return res.status(401).json({ error: "Invalid student code" });
      }

      // Check if user exists
      let user = await storage.getUserByStudentCode(studentCode);
      
      // Create user if doesn't exist
      if (!user) {
        user = await storage.createUser({ studentCode });
      }

      return res.json({ 
        success: true, 
        userId: user.id,
        message: "Code verified successfully" 
      });
    } catch (error) {
      console.error("Error verifying code:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get unlocked classes for a user
  app.get("/api/unlocked-classes/:userId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const unlockedClasses = await storage.getUnlockedClasses(userId);
      return res.json(unlockedClasses);
    } catch (error) {
      console.error("Error fetching unlocked classes:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Check if specific class is unlocked
  app.get("/api/unlocked-classes/:userId/:classId", async (req, res) => {
    try {
      const userId = parseInt(req.params.userId);
      const classId = req.params.classId;
      const isUnlocked = await storage.isClassUnlocked(userId, classId);
      return res.json({ isUnlocked });
    } catch (error) {
      console.error("Error checking class unlock status:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Unlock a class for a user
  app.post("/api/unlock-class", async (req, res) => {
    try {
      const schema = z.object({
        userId: z.number(),
        classId: z.string(),
        studentCode: z.string(),
      });

      const { userId, classId, studentCode } = schema.parse(req.body);

      // Verify student code
      if (studentCode !== "9876") {
        return res.status(401).json({ error: "Invalid student code" });
      }

      // Check if already unlocked
      const alreadyUnlocked = await storage.isClassUnlocked(userId, classId);
      if (alreadyUnlocked) {
        return res.json({ success: true, message: "Class already unlocked" });
      }

      // Unlock the class
      await storage.unlockClass({ userId, classId });
      return res.json({ success: true, message: "Class unlocked successfully" });
    } catch (error) {
      console.error("Error unlocking class:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  // Get notes for a specific class
  app.get("/api/notes/:classId", async (req, res) => {
    try {
      const classId = req.params.classId;
      const notes = await storage.getNotesByClass(classId);
      return res.json(notes);
    } catch (error) {
      console.error("Error fetching notes:", error);
      return res.status(500).json({ error: "Internal server error" });
    }
  });

  return httpServer;
    }
