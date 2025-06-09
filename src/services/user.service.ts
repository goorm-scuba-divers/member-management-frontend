import type { EditUserRequest } from "@/lib/schemas"
import { userApi } from "@/services/user.api"

interface UpdateResult {
  updatedFields: {
    nickname?: boolean
    password?: boolean
  }
  requiresLogout: boolean
}

export const userService = {
  updateCurrentUser: async (
    formData: EditUserRequest,
    dirtyFields: Record<string, boolean>
  ): Promise<UpdateResult> => {
    const changes = extractChangedData(formData, dirtyFields)

    await userApi.updateUser(changes)

    return {
      updatedFields: {
        nickname: dirtyFields.nickname || false,
        password: dirtyFields.newPassword || false,
      },
      requiresLogout: dirtyFields.newPassword || false,
    }
  },

  deleteCurrentUser: async (): Promise<void> => userApi.deleteUser(),
}

const extractChangedData = (
  formData: EditUserRequest,
  dirtyFields: Record<string, boolean>
): Partial<EditUserRequest> => {
  const changes: Partial<EditUserRequest> = {}

  if (dirtyFields.nickname) changes.nickname = formData.nickname
  if (dirtyFields.currentPassword) changes.currentPassword = formData.currentPassword
  if (dirtyFields.newPassword) changes.newPassword = formData.newPassword

  if (Object.keys(changes).length === 0) {
    throw new Error("At least nickname or password must be updated")
  }

  return changes
}
