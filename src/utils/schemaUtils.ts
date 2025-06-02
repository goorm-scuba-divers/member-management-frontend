import { FormatError } from "@/types/errors"
import type { z } from "zod"

export const validateSchema = <T>(schema: z.ZodSchema<T>, data: unknown): T => {
  try {
    return schema.parse(data)
  } catch (error) {
    const zodError = error as z.ZodError
    const issues = zodError.issues.map(issue => issue.message).join(", ")
    throw new FormatError(`${issues}`)
  }
}
