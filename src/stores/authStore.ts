import type { AuthMember, Role, AuthTokens } from "@/lib/schemas"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  isAuthenticated: boolean
  tokens: AuthTokens | null
  role: Role | null
  member: AuthMember | null
  signin: ({ member, tokens }: { member: AuthMember; tokens: AuthTokens }) => void
  signout: () => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      member: null,
      tokens: null,
      role: null,
      isAuthenticated: false,
      signin: ({ member, tokens }) => {
        set({ member, role: member.role, tokens, isAuthenticated: true })
      },
      signout: () => {
        set({ member: null, role: null, tokens: null, isAuthenticated: false })
      },
    }),
    {
      // TODO: use a more secure storage solution in production
      name: "auth_storage",
    }
  )
)
