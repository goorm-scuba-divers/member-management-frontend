import { z } from "zod"
import { nicknameSchema, passwordSchema } from "./common.schema"

// ===== USER SCHEMAS =====
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

// ===== REQUEST TYPES =====
export type EditUserRequest = z.infer<typeof editUserSchema>
