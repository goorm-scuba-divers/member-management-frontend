import { nicknameSchema, passwordSchema, roleSchema, usernameSchema } from "@/lib/schemas/member"
import { z } from "zod"

// ===== ENTITY SCHEMAS =====
export const authUserSchema = z.object({
  id: z.number().int().positive(),
  username: usernameSchema,
  nickname: nicknameSchema,
  role: roleSchema,
})

// ===== AUTH SCHEMAS =====
export const signupSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  nickname: z.string().min(1, "Nickname is required").trim(),
})

export const signinSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
})

// ===== TYPES =====
export type AuthUser = z.infer<typeof authUserSchema>
export type SignupRequest = z.infer<typeof signupSchema>
export type SigninRequest = z.infer<typeof signinSchema>
