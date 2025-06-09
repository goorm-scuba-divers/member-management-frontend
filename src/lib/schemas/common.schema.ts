import { z } from "zod"

// ===== CONSTANTS & ENUMS =====
export const ROLES = ["ADMIN", "USER"] as const
export const roleSchema = z.enum(ROLES)

// ===== FIELD SCHEMAS =====
export const usernameSchema = z.string().trim().min(1, "Username is required")

export const nicknameSchema = z.string().trim().min(1, "Nickname is required")

export const passwordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password must be at most 20 characters long")

// ===== COMMON TYPES =====
export type Role = z.infer<typeof roleSchema>
