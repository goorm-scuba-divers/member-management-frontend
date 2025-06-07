import type { UpdateMemberRequest } from "@/lib/schemas/member"
import { apiService } from "@/services/apiService"
import type { AxiosResponse } from "axios"

export const memberService = {
  update: async (request: Partial<UpdateMemberRequest>) => {
    await apiService.put<Partial<UpdateMemberRequest>, AxiosResponse>("/members", request)
  },
}
