import {
  type AuthUser,
  type SigninRequest,
  type SignupRequest,
  authUserSchema,
} from "@/lib/schemas"
import { apiClient } from "@/services"
import type { AxiosResponse } from "axios"

const AUTH_ENDPOINT = "/auth"

export const authApi = {
  signup: async (request: SignupRequest): Promise<AuthUser> => {
    const response = await apiClient.post<SignupRequest, AxiosResponse<AuthUser>>(
      `${AUTH_ENDPOINT}/sign-up`,
      request
    )
    return authUserSchema.parse(response.data)
  },

  signin: async (request: SigninRequest): Promise<AuthUser> => {
    const response = await apiClient.post<SigninRequest, AxiosResponse<AuthUser>>(
      `${AUTH_ENDPOINT}/sign-in`,
      request
    )
    return authUserSchema.parse(response.data)
  },

  signout: async (): Promise<void> => {
    await apiClient.post(`${AUTH_ENDPOINT}/sign-out`)
  },
}
