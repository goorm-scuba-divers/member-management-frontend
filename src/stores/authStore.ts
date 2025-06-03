import type { Tokens } from "@/lib/schemas"
import type { Role } from "@/types/member"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface Member {
  id?: string
  username?: string
  nickname: string
}

interface AuthState {
  isAuthenticated: boolean
  tokens: Tokens | null
  role: Role | null
  member: Member | null
  signin: (tokens: Tokens) => void
  signout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      member: null,
      tokens: null,
      role: null,
      isAuthenticated: false,
      signin: tokens => {
        // TODO: fetch member info after signin and add Role to the response
        set({ member: { nickname: "NICKNAME" }, role: "ADMIN", tokens, isAuthenticated: true })
      },
      signout: () => {
        set({ member: null, role: null, tokens: null, isAuthenticated: false })
      },
    }),
    {
      // TODO: use a more secure storage solution in production
      name: "auth-storage",
    }
  )
)
