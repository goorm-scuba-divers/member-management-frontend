import type { AuthMember } from "@/lib/schemas/auth"
import type { Role } from "@/lib/schemas/member"
import { create } from "zustand"
import { persist } from "zustand/middleware"

interface AuthState {
  // State
  isAuthenticated: boolean
  member: AuthMember | null
  role: Role | null

  // Actions
  signin: (member: AuthMember) => void
  signout: () => void
  updateMember: (member: Partial<AuthMember>) => void
}

export const useAuthStore = create<AuthState>()(
  persist(
    set => ({
      member: null,
      role: null,
      isAuthenticated: false,
      signin: member => {
        set({ member, role: member.role, isAuthenticated: true })
      },
      signout: () => {
        set({ member: null, role: null, isAuthenticated: false })
      },
      updateMember: (updates: Partial<AuthMember>) => {
        set(previous => ({
          ...previous,
          member: { ...(previous.member as AuthMember), ...updates },
          role: updates.role ?? (previous.role as Role),
        }))
      },
    }),
    {
      name: "auth_storage",
    }
  )
)
