import {
  type AuthUser,
  type SigninRequest,
  type SignupRequest,
  authUserSchema,
} from "@/lib/schemas/auth"
import { apiService } from "@/services/apiService"
import type { AxiosResponse } from "axios"

export const authService = {
  signup: async (request: SignupRequest) => {
    const response = await apiService.post<SignupRequest, AxiosResponse<AuthUser>>(
      "/auth/sign-up",
      request
    )
    return authUserSchema.parse(response.data)
  },

  signin: async (request: SigninRequest) => {
    const response = await apiService.post<SigninRequest, AxiosResponse<AuthUser>>(
      "/auth/sign-in",
      request
    )
    return authUserSchema.parse(response.data)
  },

  signout: async () => {
    await apiService.post("/auth/sign-out")
  },
}
