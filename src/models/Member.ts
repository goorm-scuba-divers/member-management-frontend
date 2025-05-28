export type Member = {
  id: number
  userName: string
  nickName: string
  role: "ADMIN" | "USER"
  createDate: Date
  modifiedDate: Date
}
