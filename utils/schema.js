import { pgTable, serial, text, varchar } from "drizzle-orm/pg-core";

export const MockInterviewSchema = pgTable("mockInterview", {
  id: serial("id").primaryKey(),
  jsonMockResponse: text("jsonMockResponse").notNull(),
  jobPosition: varchar("jobPosition").notNull(),
  jobDescription: varchar("jobDescription").notNull(),
  jobExperience: varchar("jobExperience").notNull(),
  createdBy: varchar("createdBy").notNull(),
  createdAt: varchar("createdAt"),
  mockId: varchar("mockId").notNull(),
});

export const userAnswerSchema = pgTable("userAnswer", {
  id: serial("id").primaryKey(),
  mockIdRef: varchar("mockId").notNull(),
  question: varchar("question").notNull(),
  correctAnswer: varchar("correctAnswer"),
  userAnswer: text("userAnswer"),
  feedback: text("feedback"),
  rating: varchar("rating"),
  userEmail: varchar("userEmail").notNull(),
  createdAt: varchar("createdAt"),
});
