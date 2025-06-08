import type { EditUserRequest } from "@/lib/schemas/member"
import { apiService } from "@/services/apiService"
import type { AxiosResponse } from "axios"

export const userService = {
  update: async (request: Partial<EditUserRequest>) => {
    await apiService.put<Partial<EditUserRequest>, AxiosResponse>("/members", request)
  },
  delete: async () => {
    await apiService.delete<void>("/members")
  },
}
