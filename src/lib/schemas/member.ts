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

// ===== ENTITY SCHEMAS =====
export const memberSchema = z.object({
  id: z.number().int().nonnegative(),
  username: usernameSchema,
  nickname: nicknameSchema,
  role: roleSchema,
  createdAt: z
    .string()
    .datetime()
    .transform(val => new Date(val)),
  modifiedAt: z
    .string()
    .datetime()
    .transform(val => new Date(val))
    .optional(),
})

export const findMemberSchema = z.object({
  searchValue: z.string().trim(),
  role: roleSchema.optional(), // 보내지 않으면 모든 역할 조회
  sortBy: z.enum(["CREATED_AT", "MODIFIED_AT", "USERNAME"]).optional(), // 기본값 CREATED_AT
  sortDirection: z.enum(["ASC", "DESC"]).optional(),
  page: z.number().int().nonnegative().default(0),
  size: z.number().int().positive().default(10),
})

export const memberPageSchema = z.object({
  content: z.array(memberSchema),
  page: z.number().int().nonnegative(),
  size: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
})

export const editUserSchema = z
  .object({
    nickname: nicknameSchema,
    currentPassword: passwordSchema.or(z.literal("")),
    newPassword: passwordSchema.or(z.literal("")),
  })
  .superRefine(({ currentPassword, newPassword }, ctx) => {
    // Validate current password
    if (newPassword && !currentPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "Current password is required to set a new password",
        path: ["currentPassword"],
      })
    }

    // Validate new password
    if (currentPassword && !newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password is required",
        path: ["newPassword"],
      })
    }

    // Validate that new password is different from current password
    if (currentPassword && newPassword && currentPassword === newPassword) {
      ctx.addIssue({
        code: z.ZodIssueCode.custom,
        message: "New password must be different from current password",
        path: ["newPassword"],
      })
    }
  })

// ===== ENTITY TYPE =====
export type Role = z.infer<typeof roleSchema>

// ===== REQUEST TYPES =====
export type FindMemberRequest = z.infer<typeof findMemberSchema>
export type EditUserRequest = z.infer<typeof editUserSchema>

// ===== RESPONSE TYPES =====
export type Member = z.infer<typeof memberSchema>
export type MemberPageResponse = z.infer<typeof memberPageSchema>
