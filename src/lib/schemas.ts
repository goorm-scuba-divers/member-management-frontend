import { ROLES } from "@/types/member"
import { z } from "zod"

export const RoleSchema = z.enum(ROLES)

export const TokensSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().min(1, "Refresh token is required"),
})

export const AuthMemberSchema = z.object({
  id: z.number().optional(),
  nickname: z.string().min(1, "Nickname is required"),
  role: RoleSchema.optional(),
  username: z.string().optional(),
})

// Request Schemas
export const SignupRequestSchema = z.object({
  username: z.string().min(1, "Username is required"),
  nickname: z.string().min(1, "Nickname is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
})

export const SigninRequestSchema = z.object({
  username: z.string().min(1, "Username is required"),
  password: z
    .string()
    .min(8, "Password must be at least 8 characters long")
    .max(20, "Password must be at most 20 characters long"),
})

// Response Schemas
export const SignupResponseSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().min(1, "Refresh token is required"),
})

export const SigninResponseSchema = z.object({
  accessToken: z.string().min(1, "Access token is required"),
  refreshToken: z.string().min(1, "Refresh token is required"),
})

export const LogoutResponseSchema = z.object({
  message: z.string().optional(),
})

// Type inference
export type Role = z.infer<typeof RoleSchema>
export type Tokens = z.infer<typeof TokensSchema>
export type AuthMember = z.infer<typeof AuthMemberSchema>
export type SignupRequest = z.infer<typeof SignupRequestSchema>
export type SigninRequest = z.infer<typeof SigninRequestSchema>
export type SignupResponse = z.infer<typeof SignupResponseSchema>
export type SigninResponse = z.infer<typeof SigninResponseSchema>
export type LogoutResponse = z.infer<typeof LogoutResponseSchema>
