import { z } from "zod"

export const ROLES = ["ADMIN", "USER"] as const

export const RoleSchema = z.enum(ROLES)

export const MemberSchema = z.object({
  id: z.number(),
  userName: z.string(),
  nickName: z.string(),
  role: RoleSchema,
  createDate: z.date(),
  modifiedDate: z.date(),
})

export const AuthTokensSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().min(1, "Refresh token is required"),
})

// Common field schemas
const usernameSchema = z.string().min(1, "Username is required").trim()
const nicknameSchema = z.string().min(1, "Nickname is required").trim()
const passwordSchema = z
  .string()
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password must be at most 20 characters long")
  .trim()

export const AuthMemberSchema = z.object({
  id: z.number(),
  username: z.string(),
  nickname: z.string(),
  role: z.enum(ROLES),
})

export const SignSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
})

// Request Schemas
export const SignupRequestSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
  nickname: nicknameSchema,
})

export const SigninRequestSchema = z.object({
  username: usernameSchema,
  password: passwordSchema,
})

// Response Schemas
export const SignupResponseSchema = z.object({
  member: AuthMemberSchema,
  tokens: AuthTokensSchema,
})

export const SigninResponseSchema = z.object({
  member: AuthMemberSchema,
  tokens: AuthTokensSchema,
})

// Auth Types
export type AuthTokens = z.infer<typeof AuthTokensSchema>
export type Role = z.infer<typeof RoleSchema>
export type AuthMember = z.infer<typeof AuthMemberSchema>

// Sign Types
export type SignupRequest = z.infer<typeof SignupRequestSchema>
export type SigninRequest = z.infer<typeof SigninRequestSchema>
export type SignupResponse = z.infer<typeof SignupResponseSchema>
export type SigninResponse = z.infer<typeof SigninResponseSchema>

// Member Types
export type Member = z.infer<typeof MemberSchema>
