import { NicknameSchema, PasswordSchema, RoleSchema, UsernameSchema } from "@/lib/schemas/member"
import { z } from "zod"

// ===== ENTITY SCHEMAS =====
export const AuthMemberSchema = z.object({
  id: z.number().int().positive(),
  username: UsernameSchema,
  nickname: NicknameSchema,
  role: RoleSchema,
})

// ===== REQUEST SCHEMAS =====
export const SignupRequestSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
  nickname: z.string().min(1, "Nickname is required").trim(),
})

export const SigninRequestSchema = z.object({
  username: UsernameSchema,
  password: PasswordSchema,
})

// ===== RESPONSE SCHEMAS =====
export const SignupResponseSchema = AuthMemberSchema
export const SigninResponseSchema = AuthMemberSchema

// ===== TYPES =====
export type AuthMember = z.infer<typeof AuthMemberSchema>

// Request Types
export type SignupRequest = z.infer<typeof SignupRequestSchema>
export type SigninRequest = z.infer<typeof SigninRequestSchema>

// Response Types
export type SignupResponse = z.infer<typeof SignupResponseSchema>
export type SigninResponse = z.infer<typeof SigninResponseSchema>
