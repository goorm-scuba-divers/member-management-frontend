import type { AuthUser } from "@/lib/schemas/auth"
import type { Role } from "@/lib/schemas/member"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  // State
  isAuthenticated: boolean
  user: AuthUser | null
  role: Role | null

  // Actions
  signin: (user: AuthUser) => void
  signout: () => void
  updateUser: (user: Partial<AuthUser>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      user: null,
      role: null,
      isAuthenticated: false,
      signin: user => {
        set({ user: user, role: user.role, isAuthenticated: true })
      },
      signout: () => {
        set({ user: null, role: null, isAuthenticated: false })
      },
      updateUser: (user: Partial<AuthUser>) => {
        set(previous => ({
          ...previous,
          user: { ...(previous.user as AuthUser), ...user },
          role: user.role ?? (previous.role as Role),
        }))
      },
    }),
    {
      name: "auth_storage",
    }
  )
)
