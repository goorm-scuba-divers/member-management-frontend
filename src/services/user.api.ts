import type { EditUserRequest } from "@/lib/schemas"
import { apiClient } from "@/services"
import type { AxiosResponse } from "axios"

const USER_ENDPOINT = "/user"

export const userApi = {
  updateUser: async (request: Partial<EditUserRequest>): Promise<void> => {
    await apiClient.put<Partial<EditUserRequest>, AxiosResponse>(USER_ENDPOINT, request)
  },

  deleteUser: async (): Promise<void> => {
    await apiClient.delete(USER_ENDPOINT)
  },
}