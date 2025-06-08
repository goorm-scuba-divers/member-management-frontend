import { z } from "zod"

// ===== CONSTANTS & ENUMS =====
export const ROLES = ["ADMIN", "USER"] as const
export const RoleSchema = z.enum(ROLES)

// ===== FIELD SCHEMAS =====
export const UsernameSchema = z.string().trim().min(1, "Username is required")

export const NicknameSchema = z.string().trim().min(1, "Nickname is required")

export const PasswordSchema = z
  .string()
  .trim()
  .min(8, "Password must be at least 8 characters long")
  .max(20, "Password must be at most 20 characters long")

// ===== ENTITY SCHEMAS =====
export const MemberSchema = z.object({
  id: z.number().int().nonnegative(),
  username: UsernameSchema,
  nickname: NicknameSchema,
  role: RoleSchema,
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

export const FindMemberSchema = z.object({
  searchValue: z.string().trim(),
  role: RoleSchema.optional(), // 보내지 않으면 모든 역할 조회
  sortBy: z.enum(["CREATED_AT", "MODIFIED_AT", "USERNAME"]).optional(), // 기본값 CREATED_AT
  sortDirection: z.enum(["ASC", "DESC"]).optional(),
  page: z.number().int().nonnegative().default(0),
  size: z.number().int().positive().default(10),
})

export const FindMemberPageSchema = z.object({
  content: z.array(MemberSchema),
  page: z.number().int().nonnegative(),
  size: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
})

export const UpdateMemberFormSchema = z
  .object({
    nickname: NicknameSchema,
    currentPassword: PasswordSchema.or(z.literal("")),
    newPassword: PasswordSchema.or(z.literal("")),
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

// ===== TYPES =====
export type Role = z.infer<typeof RoleSchema>
export type Member = z.infer<typeof MemberSchema>

// ===== REQUEST TYPES =====
export type FindMemberRequest = z.infer<typeof FindMemberSchema>
export type UpdateMemberRequest = z.infer<typeof UpdateMemberFormSchema>

// ===== RESPONSE TYPES =====
export type FindMemberPageResponse = z.infer<typeof FindMemberPageSchema>
