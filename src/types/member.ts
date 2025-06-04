export const ROLES = ["ADMIN", "USER"] as const

export type Role = (typeof ROLES)[number]

export interface Member {
  id: number
  userName: string
  nickName: string
  role: Role
  createDate: Date
  modifiedDate: Date
}
