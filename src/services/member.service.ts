import type { FindMemberRequest, MemberPageResponse } from "@/lib/schemas"
import { membersApi } from "@/services/members.api"

export const memberService = {
  findMembers: async (params: Partial<FindMemberRequest>): Promise<MemberPageResponse> =>
    membersApi.findMembers(params),
}
