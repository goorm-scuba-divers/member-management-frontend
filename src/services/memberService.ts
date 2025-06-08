import {
  FindMemberPageSchema,
  type FindMemberPageResponse,
  type FindMemberRequest,
  type UpdateMemberRequest,
} from "@/lib/schemas/member"
import { apiService } from "@/services/apiService"
import type { AxiosResponse } from "axios"

export const memberService = {
  findMembers: async (params: FindMemberRequest) => {
    const response = await apiService.get<FindMemberRequest, AxiosResponse<FindMemberPageResponse>>(
      "/members",
      {
        params: { ...params },
      }
    )

    return FindMemberPageSchema.parse(response.data)
  },
  update: async (request: Partial<UpdateMemberRequest>) => {
    await apiService.put<Partial<UpdateMemberRequest>, AxiosResponse>("/members", request)
  },
  delete: async () => {
    await apiService.delete<void>("/members")
  },
}
