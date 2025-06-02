import { apiService } from "@/services/apiService"
import {
  type SignupRequest,
  type SignupResponse,
  type SigninRequest,
  type SigninResponse,
  SignupResponseSchema,
  SigninResponseSchema,
} from "@/lib/schemas"
import { FormatError, ServiceError, type ErrorCode } from "@/types/errors"
import { validateSchema } from "@/utils/schemaUtils"
import { AxiosError, type AxiosResponse } from "axios"

export const authService = {
  signup: async (request: SignupRequest): Promise<SignupResponse> => {
    try {
      const response = await apiService.post<SignupRequest, AxiosResponse<SignupResponse>>(
        "/auth/sign-up",
        request
      )
      return validateSchema(SignupResponseSchema, response.data)
    } catch (error) {
      // TODO: Handle specific error cases for signup
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as { message: string; code: ErrorCode }
        throw new ServiceError(errorData.message, errorData.code)
      }

      if (error instanceof FormatError) {
        throw new ServiceError(error.message, error.code)
      }

      throw error
    }
  },

  signin: async (request: SigninRequest): Promise<SigninResponse> => {
    try {
      const response = await apiService.post<SigninRequest, AxiosResponse<SigninResponse>>(
        "/auth/sign-in",
        request
      )
      return validateSchema(SigninResponseSchema, response.data)
    } catch (error) {
      // TODO: Handle specific error cases for signin
      if (error instanceof AxiosError) {
        const errorData = error.response?.data as { message: string; code: ErrorCode }
        throw new ServiceError(errorData.message, errorData.code)
      }

      if (error instanceof FormatError) {
        throw new ServiceError(error.message, error.code)
      }

      throw error
    }
  },
}
