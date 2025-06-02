export type ErrorCode =
  // Common Errors
  | "COMMON_INTERNAL_SERVER_ERROR"
  | "COMMON_BAD_REQUEST"
  | "COMMON_RESPONSE_FORMAT_ERROR"
  | "COMMON_NETWORK_ERROR"
  // Auth Errors
  | "AUTH_UNAUTHORIZED"
  | "AUTH_USERNAME_PASSWORD_INVALID"
  | "AUTH_TOKEN_EXPIRED"
  // Member Errors
  | "MEMBER_EXISTS"
  | "MEMBER_PASSWORD_INVALID"
  | "AUTHENTICATION_ERROR"

export class ServiceError extends Error {
  code: ErrorCode

  constructor(message: string, code?: ErrorCode, _field?: string) {
    super(message)
    this.name = "ServiceError"
    this.code = code || "COMMON_INTERNAL_SERVER_ERROR"
  }
}

export class ValidationError extends ServiceError {
  constructor(message: string, field?: string) {
    super(message, "COMMON_BAD_REQUEST", field)
    this.name = "ValidationError"
  }
}

export class NetworkError extends ServiceError {
  constructor(message: string) {
    super(message, "COMMON_NETWORK_ERROR")
    this.name = "NetworkError"
  }
}

export class FormatError extends ServiceError {
  constructor(message: string) {
    super(message, "COMMON_RESPONSE_FORMAT_ERROR")
    this.name = "ResponseFormatError"
  }
}

export class AuthenticationError extends ServiceError {
  constructor(message = "Authentication failed") {
    super(message, "AUTHENTICATION_ERROR")
    this.name = "AuthenticationError"
  }
}

export class AuthorizationError extends ServiceError {
  constructor(message = "Access denied") {
    super(message, "AUTH_UNAUTHORIZED")
    this.name = "AuthorizationError"
  }
}

export class TokenExpiredError extends ServiceError {
  constructor(message = "Token has expired") {
    super(message, "AUTH_TOKEN_EXPIRED")
    this.name = "TokenExpiredError"
  }
}

export class InvalidCredentialsError extends ServiceError {
  constructor(message = "Invalid username or password") {
    super(message, "AUTH_USERNAME_PASSWORD_INVALID")
    this.name = "InvalidCredentialsError"
  }
}
