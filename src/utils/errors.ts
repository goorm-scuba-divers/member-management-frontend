import { AxiosError } from "axios"
import { ZodError } from "zod"

export function handleError(error: unknown): string {
  if (error instanceof AxiosError) {
    if (!error.response) {
      // Network errors
      switch (error.code) {
        case "ECONNABORTED":
        case "ETIMEDOUT":
          return "Request timeout"
        case "ENOTFOUND":
          return "Server not found"
        case "ECONNREFUSED":
          return "Connection refused"
        case "ERR_NETWORK":
          return "Network error"
        default:
          return "Network connection failed"
      }
    }

    console.error("[ERROR HANDLER]:", error)

    const status = error.response.status
    const message = error.response.data?.message

    switch (status) {
      case 400:
        return message || "Invalid request data"
      case 401:
        return message || "Authentication required"
      case 403:
        return message || "Access denied"
      case 409:
        return message || "Account already exists"
      case 500:
        return message || "Internal server error"
      default:
        return message || "An error occurred"
    }
  }

  // Zod error handling
  if (error instanceof ZodError) return error.errors[0]?.message || "Invalid input data"

  // General error handling
  if (error instanceof Error) return error.message

  return "Unknown error occurred"
}
