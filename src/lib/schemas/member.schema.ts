import { z } from "zod"
import { nicknameSchema, roleSchema, usernameSchema } from "./common.schema"

// ===== ENTITY SCHEMAS =====
export const memberSchema = z.object({
  id: z.number().int().nonnegative(),
  username: usernameSchema,
  nickname: nicknameSchema,
  role: roleSchema,
  createdAt: z.string().transform(val => new Date(val)),
  modifiedAt: z
    .string()
    .transform(val => new Date(val))
    .optional(),
})

export const findMemberSchema = z.object({
  searchValue: z.string().trim(),
  role: roleSchema.optional(), // 보내지 않으면 모든 역할 조회
  sortBy: z.enum(["CREATED_AT", "MODIFIED_AT", "USERNAME"]).optional(), // 기본값 CREATED_AT
  sortDirection: z.enum(["ASC", "DESC"]).optional(),
  page: z.number().int().nonnegative().default(0),
  size: z.number().int().nonnegative().default(10),
})

export const memberPageSchema = z.object({
  content: z.array(memberSchema),
  page: z.number().int().nonnegative(),
  size: z.number().int().nonnegative(),
  total: z.number().int().nonnegative(),
})

// ===== REQUEST TYPES =====
export type FindMemberRequest = z.infer<typeof findMemberSchema>

// ===== RESPONSE TYPES =====
export type Member = z.infer<typeof memberSchema>
export type MemberPageResponse = z.infer<typeof memberPageSchema>
