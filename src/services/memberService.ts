import {
  type FindMemberRequest,
  type MemberPageResponse,
  memberPageSchema,
} from "@/lib/schemas/member"
import { apiService } from "@/services/apiService"
import type { AxiosResponse } from "axios"

export const memberService = {
  findMembers: async (params: FindMemberRequest) => {
    const response = await apiService.get<FindMemberRequest, AxiosResponse<MemberPageResponse>>(
      "/members",
      {
        params: { ...params },
      }
    )
    return memberPageSchema.parse(response.data)
  },
}
