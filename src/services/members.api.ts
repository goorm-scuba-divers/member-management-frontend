import { type FindMemberRequest, type MemberPageResponse, memberPageSchema } from "@/lib/schemas"
import { apiClient } from "@/services"
import type { AxiosResponse } from "axios"

const MEMBERS_ENDPOINT = "/members"

export const membersApi = {
  findMembers: async (params: Partial<FindMemberRequest>): Promise<MemberPageResponse> => {
    const response = await apiClient.get<
      Partial<FindMemberRequest>,
      AxiosResponse<MemberPageResponse>
    >(MEMBERS_ENDPOINT, {
      params,
    })
    return memberPageSchema.parse(response.data)
  },
}
