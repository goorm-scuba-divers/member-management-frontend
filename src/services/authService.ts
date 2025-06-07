import {
  type SignupRequest,
  type SignupResponse,
  SignupResponseSchema,
  type SigninRequest,
  type SigninResponse,
  SigninResponseSchema,
} from "@/lib/schemas/auth"
import { apiService } from "@/services/apiService"
import type { AxiosResponse } from "axios"

export const authService = {
  signup: async (request: SignupRequest) => {
    const response = await apiService.post<SignupRequest, AxiosResponse<SignupResponse>>(
      "/auth/sign-up",
      request
    )
    return SignupResponseSchema.parse(response.data)
  },

  signin: async (request: SigninRequest) => {
    const response = await apiService.post<SigninRequest, AxiosResponse<SigninResponse>>(
      "/auth/sign-in",
      request
    )
    return SigninResponseSchema.parse(response.data)
  },

  signout: async () => {
    await apiService.post("/auth/sign-out")
  },
}
