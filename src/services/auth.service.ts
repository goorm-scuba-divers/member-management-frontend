import type { AuthUser, SigninRequest, SignupRequest } from "@/lib/schemas"
import { authApi } from "@/services"

export const authService = {
  signup: async (credentials: SignupRequest): Promise<AuthUser> => {
    return authApi.signup(credentials)
  },
  signin: async (credentials: SigninRequest): Promise<AuthUser> => {
    return authApi.signin(credentials)
  },
  signout: async (): Promise<void> => {
    return authApi.signout()
  },
  refresh: async (): Promise<void> => {
    await authApi.refresh()
  },
}
