import type { Tokens } from "@/lib/schemas"
import type { Role } from "@/types/member"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  tokens: Tokens | null
  role: Role | null
  isAuthenticated: boolean
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
        set({ tokens, isAuthenticated: true })
      },
      signout: () => {
        set({ tokens: null, isAuthenticated: false })
      },
    }),
    {
      // TODO: use a more secure storage solution in production
      name: "auth-storage",
    }
  )
)
